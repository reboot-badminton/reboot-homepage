'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, getRole, getUserData, Role, UserData } from '@/firebase';

interface AuthContextType {
  uid: string | null;
  userData: UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a ClientAuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [uid, setUid] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUid(user?.uid ?? null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (uid == null) return;

    getUserData().then(setUserData);
  }, [uid, setUserData]);

  return <AuthContext.Provider value={{ uid, userData }}>{children}</AuthContext.Provider>;
}
