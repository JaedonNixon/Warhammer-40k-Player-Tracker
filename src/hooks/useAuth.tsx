/**
 * hooks/useAuth.tsx — Authentication context provider and hook.
 *
 * Provides app-wide authentication state via React Context:
 * - `user`: The currently signed-in Firebase User (or null)
 * - `isAdmin`: Hardcoded permanent admin (jaedonnixon19@gmail.com only)
 * - `isMod`: Whether the user's email exists in the Firestore "admins" collection
 * - `loading`: Whether auth state is still being determined
 *
 * ARCHITECTURE:
 * - AuthProvider wraps the entire app (in index.tsx) and subscribes to
 *   Firebase onAuthStateChanged.
 * - When a user signs in, it checks if their email matches the hardcoded
 *   admin or is a doc ID in the Firestore "admins" collection (mod).
 * - Components use the useAuth() hook to access auth state.
 *
 * ROLE SYSTEM:
 * - Admin: Hardcoded to jaedonnixon19@gmail.com. Full access including
 *   the admin panel (mod management) and player deletion.
 * - Mod: Stored in Firestore collection "admins" where each doc ID
 *   is the mod's email address and the doc contains { role: "admin" }.
 *   Mods get all elevated access (add/edit players) EXCEPT:
 *     1. Cannot access the Admin Panel (mod management)
 *     2. Cannot delete player profiles
 * - The hardcoded admin is ALSO treated as a mod (has both flags).
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/** The one hardcoded permanent admin email (case-insensitive comparison). */
const PERMANENT_ADMIN_EMAIL = "jaedonnixon19@gmail.com";

/** Shape of the auth context value provided to all consumers. */
interface AuthContextType {
  user: User | null;      // Firebase User object (null if not signed in)
  isAdmin: boolean;       // True ONLY for the hardcoded permanent admin
  isMod: boolean;         // True for mods (Firestore "admins" collection) AND the admin
  loading: boolean;       // True while checking initial auth state
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isMod: false,
  loading: true,
});

/** Hook to access auth state from any component. */
export const useAuth = () => useContext(AuthContext);

/**
 * Provider component that wraps the app and manages auth state.
 * Listens to Firebase auth changes and checks admin/mod status on sign-in.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes.
    // On sign-in: check if user is the hardcoded admin or a mod.
    // On sign-out: reset all role flags.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser && firebaseUser.email) {
        const email = firebaseUser.email.toLowerCase();

        // Track this account in the "users" collection so the admin panel
        // can list all accounts that have ever signed in.
        await setDoc(doc(db, "users", email), {
          email,
          lastLogin: new Date().toISOString(),
        }, { merge: true });

        // Permanent admin check (hardcoded)
        const adminFlag = email === PERMANENT_ADMIN_EMAIL;
        setIsAdmin(adminFlag);

        // Mod check: doc ID in "admins" collection = user's email
        // The permanent admin is always a mod too, even without a Firestore entry
        if (adminFlag) {
          setIsMod(true);
        } else {
          const modDoc = await getDoc(doc(db, "admins", email));
          setIsMod(modDoc.exists());
        }
      } else {
        setIsAdmin(false);
        setIsMod(false);
      }
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, isMod, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
