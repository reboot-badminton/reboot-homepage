'use client';

import { Role } from '@/firebase';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useAuth } from './providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useDialog } from './providers/DialogProvider';

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
  const { showDialog } = useDialog();
  
  const unauthorizedCallback = useCallback(() => {
    console.log('unauthorized', requiresSignOut);
    if (onUnauthorized == null) {
      showDialog({
        title: '접근 권한이 없습니다',
        onConfirm: () => {
          router.back();
          return true;
        },
      });
      return;
    }
    onUnauthorized();
  }, [router, onUnauthorized]);

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
