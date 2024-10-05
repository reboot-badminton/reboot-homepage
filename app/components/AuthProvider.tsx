'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, getRole, Role } from '@/firebase';

interface AuthContextType {
    uid: string | null;
    role: Role | null;
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
    const [role, setRole] = useState<Role | null>(null);

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
