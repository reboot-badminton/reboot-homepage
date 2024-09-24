'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, getRole, Role } from '@/firebase';

interface AuthContextType {
  uid: string | null;
  role: Role;
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
  const [role, setRole] = useState(Role.NONE);

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
        setRole(Role.NONE);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ uid, role }}>{children}</AuthContext.Provider>;
}