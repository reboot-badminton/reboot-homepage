'use client';

import { Role } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useAuth } from './providers/AuthProvider';

interface Props {
  requiresSignOut?: boolean;
  allowedRoles?: Role[];
  onUnauthorized?: () => void;
}

export default function Authorized({
  requiresSignOut,
  allowedRoles,
  onUnauthorized,
  children,
}: PropsWithChildren<Props>) {
  const { userData, isAuthReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const unauthorizedCallback = useCallback(() => {
    if (onUnauthorized == null) {
      router.back();
      return;
    }
    onUnauthorized();
  }, [router, onUnauthorized, pathname]);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (userData != null && requiresSignOut) {
      unauthorizedCallback();
      return;
    }

    if (allowedRoles != null) {
      const role = userData?.role;
      if (role == null) {
        unauthorizedCallback();
        return;
      }

      if (allowedRoles.indexOf(role) === -1) {
        unauthorizedCallback();
        return;
      }
    }
  }, [isAuthReady, userData, unauthorizedCallback, allowedRoles, requiresSignOut]);

  return <>{isAuthReady && children}</>;
}
