'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, getRole, getUserData, Role, UserData } from '@/firebase';

interface AuthContextType {
  auth: Auth,
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
  const [auth,] = useState<Auth>(getAuth(app));
  const [uid, setUid] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUid(user?.uid ?? null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (uid == null) {
      setUserData(null);
    }

    getUserData().then(setUserData);
  }, [auth, uid, setUserData]);

  return <AuthContext.Provider value={{ auth, uid, userData }}>{children}</AuthContext.Provider>;
}
