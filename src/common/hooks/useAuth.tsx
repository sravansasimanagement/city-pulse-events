import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

type AuthUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
} | null;

type AuthContextValue = {
  user: AuthUser;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const u = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
        };
        setUser(u);
        // persist minimal user to localStorage
        localStorage.setItem("cp_user", JSON.stringify(u));
      } else {
        setUser(null);
        localStorage.removeItem("cp_user");
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function signUp(email: string, password: string, displayName?: string) {
    setLoading(true);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    const userDocRef = doc(db, "users", cred.user.uid);
    await setDoc(userDocRef, {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: displayName || cred.user.displayName || null,
      createdAt: serverTimestamp(),
      favorites: [], 
    });
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will update state and localStorage
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  async function refreshUser() {
    if (!auth.currentUser) return;
    const docRef = doc(db, "users", auth.currentUser.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      setUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: data.displayName || auth.currentUser.displayName,
      });
      localStorage.setItem(
        "cp_user",
        JSON.stringify({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: data.displayName || auth.currentUser.displayName,
        })
      );
    }
  }

  const value: AuthContextValue = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
