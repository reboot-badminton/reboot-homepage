'use client';

import { Role } from '@/firebase';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useAuth } from './providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface Props {
  requiresSignOut?: boolean;
  allowedRoles?: Role[];
  onUnauthorized?: () => void;
}

export default function Authorized({ requiresSignOut, allowedRoles, onUnauthorized, children }: PropsWithChildren<Props>) {
  const auth = useAuth();
  const router = useRouter();

  const unauthorizedCallback = useCallback(() => {
    if (onUnauthorized == null) {
      router.back();
      return;
    }
    onUnauthorized();
  }, [router, onUnauthorized]);

  useEffect(() => {
    if (auth.userData != null && requiresSignOut) {
      unauthorizedCallback();
      return;
    }

    if (allowedRoles != null) {
      const role = auth.userData?.role;
      if (role == null) {
        unauthorizedCallback();
        return;
      }

      if (allowedRoles.indexOf(role) === -1) {
        unauthorizedCallback();
        return;
      }
    }
  }, [auth, unauthorizedCallback]);

  return <>{children}</>;
}