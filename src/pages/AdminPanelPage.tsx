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

interface ModEntry {
  email: string;
}

const AdminPanelPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const [mods, setMods] = useState<ModEntry[]>([]);
  const [newModEmail, setNewModEmail] = useState("");
  const [modError, setModError] = useState("");
  const [modSuccess, setModSuccess] = useState("");

  useEffect(() => {
    const fetchMods = async () => {
      const snapshot = await getDocs(collection(db, "admins"));
      setMods(snapshot.docs.map((d) => ({ email: d.id })));
    };
    if (isAdmin) fetchMods();
  }, [isAdmin]);

  // Only the hardcoded admin can access this page — mods are redirected
  if (!isAdmin) return <Navigate to="/" replace />;

  const handleAddMod = async () => {
    setModError("");
    setModSuccess("");
    const email = newModEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      setModError("Enter a valid email.");
      return;
    }
    if (mods.some((m) => m.email === email)) {
      setModError("Already a mod.");
      return;
    }
    await setDoc(doc(db, "admins", email), { role: "admin" });
    setMods([...mods, { email }]);
    setNewModEmail("");
    setModSuccess(`${email} added as mod.`);
  };

  const handleRemoveMod = async (email: string) => {
    if (!window.confirm(`Remove ${email} as mod?`)) return;
    await deleteDoc(doc(db, "admins", email));
    setMods(mods.filter((m) => m.email !== email));
    setModSuccess(`${email} removed.`);
  };

  return (
    <div className="admin-panel-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🔧</span> Admin Panel
        </h1>
        <p className="page-description">Manage your Warhammer 40K tracker</p>
      </header>

      {/* Mod Management */}
      <section className="admin-section">
        <h2 className="admin-section-title">🔑 Moderator Accounts</h2>
        <div className="admin-list">
          {mods.map((m) => (
            <div key={m.email} className="admin-list-item">
              <span className="admin-email">{m.email}</span>
              <button
                className="admin-remove-btn"
                onClick={() => handleRemoveMod(m.email)}
              >
                Remove
              </button>
            </div>
          ))}
          {mods.length === 0 && (
            <p style={{ color: '#aaa', padding: '12px 0' }}>No moderators assigned yet.</p>
          )}
        </div>
        <div className="admin-add-row">
          <input
            type="email"
            placeholder="Email address"
            value={newModEmail}
            onChange={(e) => setNewModEmail(e.target.value)}
            className="admin-input"
          />
          <button className="admin-add-btn" onClick={handleAddMod}>
            Add Mod
          </button>
        </div>
        {modError && <p className="admin-error">{modError}</p>}
        {modSuccess && <p className="admin-success">{modSuccess}</p>}
      </section>
    </div>
  );
};

export default AdminPanelPage;
