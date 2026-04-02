/**
 * AdminPanelPage.tsx — Admin-only control panel
 *
 * Route: /admin (guarded — redirects to / if not the hardcoded admin)
 *
 * Only accessible by the permanent admin (jaedonnixon19@gmail.com).
 * Mods do NOT have access to this page.
 *
 * Contains one section:
 *   - Mod Management: list current mods, add new ones by email,
 *     remove existing ones.
 *
 * Mods are stored in the Firestore "admins" collection where each
 * doc ID is the mod's email address with content { role: "admin" }.
 *
 * Data source: Direct Firestore reads/writes (admins collection)
 * Styled by: styles/AdminPanel.css
 */
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Navigate } from "react-router-dom";
import "../styles/AdminPanel.css";

/** A registered account (from the "users" Firestore collection). */
interface UserEntry {
  email: string;
  lastLogin: string;
  isMod: boolean;
}

const PERMANENT_ADMIN_EMAIL = "jaedonnixon19@gmail.com";

const AdminPanelPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [modSuccess, setModSuccess] = useState("");

  useEffect(() => {
    const fetchUsersAndMods = async () => {
      // Fetch all registered accounts and all current mods in parallel
      const [usersSnap, modsSnap] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "admins")),
      ]);

      const modEmails = new Set(modsSnap.docs.map((d) => d.id));

      const userList: UserEntry[] = usersSnap.docs.map((d) => {
        const data = d.data();
        return {
          email: d.id,
          lastLogin: data.lastLogin || "",
          isMod: modEmails.has(d.id),
        };
      });

      // Sort: admin first, then mods, then regular users (alphabetical within each group)
      userList.sort((a, b) => {
        const aIsAdmin = a.email === PERMANENT_ADMIN_EMAIL;
        const bIsAdmin = b.email === PERMANENT_ADMIN_EMAIL;
        if (aIsAdmin !== bIsAdmin) return aIsAdmin ? -1 : 1;
        if (a.isMod !== b.isMod) return a.isMod ? -1 : 1;
        return a.email.localeCompare(b.email);
      });

      setUsers(userList);
      setLoadingUsers(false);
    };
    if (isAdmin) fetchUsersAndMods();
  }, [isAdmin]);

  // Only the hardcoded admin can access this page — mods are redirected
  if (!isAdmin) return <Navigate to="/" replace />;

  const handleToggleMod = async (email: string, currentlyMod: boolean) => {
    setModSuccess("");
    if (currentlyMod) {
      if (!window.confirm(`Remove mod status from ${email}?`)) return;
      await deleteDoc(doc(db, "admins", email));
      setUsers(users.map((u) => u.email === email ? { ...u, isMod: false } : u));
      setModSuccess(`${email} is no longer a mod.`);
    } else {
      await setDoc(doc(db, "admins", email), { role: "admin" });
      setUsers(users.map((u) => u.email === email ? { ...u, isMod: true } : u));
      setModSuccess(`${email} is now a mod.`);
    }
  };

  return (
    <div className="admin-panel-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🔧</span> Admin Panel
        </h1>
        <p className="page-description">Manage your Warhammer 40K tracker</p>
      </header>

      {/* All Registered Accounts */}
      <section className="admin-section">
        <h2 className="admin-section-title">👥 Registered Accounts</h2>
        {modSuccess && <p className="admin-success">{modSuccess}</p>}

        {loadingUsers ? (
          <p style={{ color: "#aaa", padding: "12px 0" }}>Loading accounts...</p>
        ) : users.length === 0 ? (
          <p style={{ color: "#aaa", padding: "12px 0" }}>No accounts found.</p>
        ) : (
          <div className="admin-user-list">
            {users.map((u) => {
              const isThisAdmin = u.email === PERMANENT_ADMIN_EMAIL;
              return (
                <div key={u.email} className="admin-user-item">
                  <div className="admin-user-info">
                    <span className="admin-email">{u.email}</span>
                    <div className="admin-user-badges">
                      {isThisAdmin && <span className="admin-role-badge admin-badge">ADMIN</span>}
                      {u.isMod && !isThisAdmin && <span className="admin-role-badge mod-badge">MOD</span>}
                      {!isThisAdmin && !u.isMod && <span className="admin-role-badge user-badge">USER</span>}
                    </div>
                  </div>
                  <div className="admin-user-actions">
                    {!isThisAdmin && (
                      <button
                        className={u.isMod ? "admin-remove-btn" : "admin-grant-btn"}
                        onClick={() => handleToggleMod(u.email, u.isMod)}
                      >
                        {u.isMod ? "Remove Mod" : "Make Mod"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanelPage;
