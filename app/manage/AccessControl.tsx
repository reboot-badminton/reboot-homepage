'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dialog from '../components/Dialog';
import { useAuth } from '../components/AuthProvider';
import { Role } from '@/firebase';

interface AccessControlProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export default function AccessControl({ children, allowedRoles }: AccessControlProps) {
  const { uid, role } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!uid) {
      router.push('/login');
      return;
    }

    if (!role) return;

    if (!allowedRoles.includes(role)) {
      router.back();
      return;
    }

    setLoading(false);
  }, [uid, role, router, allowedRoles]);

  if (loading) {
    return <Dialog text="Loading" useDotAnimation={true} />;
  }

  return <>{children}</>;
}