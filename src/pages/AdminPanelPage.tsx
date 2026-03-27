import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Navigate } from "react-router-dom";
import "../styles/AdminPanel.css";

interface AdminEntry {
  email: string;
}

const AdminPanelPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const [admins, setAdmins] = useState<AdminEntry[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      const snapshot = await getDocs(collection(db, "admins"));
      setAdmins(snapshot.docs.map((d) => ({ email: d.id })));
    };
    if (isAdmin) fetchAdmins();
  }, [isAdmin]);

  if (!isAdmin) return <Navigate to="/" replace />;

  const handleAddAdmin = async () => {
    setAdminError("");
    setAdminSuccess("");
    const email = newAdminEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      setAdminError("Enter a valid email.");
      return;
    }
    if (admins.some((a) => a.email === email)) {
      setAdminError("Already an admin.");
      return;
    }
    await setDoc(doc(db, "admins", email), { role: "admin" });
    setAdmins([...admins, { email }]);
    setNewAdminEmail("");
    setAdminSuccess(`${email} added as admin.`);
  };

  const handleRemoveAdmin = async (email: string) => {
    if (email === user?.email) {
      setAdminError("You can't remove yourself.");
      return;
    }
    if (!window.confirm(`Remove ${email} as admin?`)) return;
    await deleteDoc(doc(db, "admins", email));
    setAdmins(admins.filter((a) => a.email !== email));
    setAdminSuccess(`${email} removed.`);
  };

  return (
    <div className="admin-panel-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🔧</span> Admin Panel
        </h1>
        <p className="page-description">Manage your Warhammer 40K tracker</p>
      </header>

      {/* Admin Management */}
      <section className="admin-section">
        <h2 className="admin-section-title">🔑 Admin Accounts</h2>
        <div className="admin-list">
          {admins.map((a) => (
            <div key={a.email} className="admin-list-item">
              <span className="admin-email">{a.email}</span>
              {a.email === user?.email ? (
                <span className="admin-you-badge">You</span>
              ) : (
                <button
                  className="admin-remove-btn"
                  onClick={() => handleRemoveAdmin(a.email)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="admin-add-row">
          <input
            type="email"
            placeholder="Email address"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="admin-input"
          />
          <button className="admin-add-btn" onClick={handleAddAdmin}>
            Add Admin
          </button>
        </div>
        {adminError && <p className="admin-error">{adminError}</p>}
        {adminSuccess && <p className="admin-success">{adminSuccess}</p>}
      </section>
    </div>
  );
};

export default AdminPanelPage;
