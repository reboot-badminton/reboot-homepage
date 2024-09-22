'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, getRole } from '@/firebase';

interface AuthContextType {
  uid: string | null;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a ClientAuthProvider');
  }
  return context;
}

export function AuthProvider({ children, initialUid }: { children: ReactNode, initialUid: string | null }) {
  const [uid, setUid] = useState<string | null>(initialUid);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
       if (user) {
        setUid(user.uid);

        // role 정보 가져오기
        const userRole = await getRole();
        setRole(userRole);
      } else {
        setUid(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ uid, role }}>{children}</AuthContext.Provider>;
}