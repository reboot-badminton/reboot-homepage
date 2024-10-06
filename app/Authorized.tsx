'use client';

import { Role } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useAuth } from './providers/AuthProvider';
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
  const pathname = usePathname();
  const { showDialog } = useDialog();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isAuthReady || isAuthorized == null || isAuthorized) {
      return;
    }

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
  }, [router, onUnauthorized, pathname, isAuthReady, isAuthorized]);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (userData != null && requiresSignOut) {
      setIsAuthorized(false);
      return;
    }

    if (allowedRoles != null) {
      const role = userData?.role;
      if (role == null) {
        setIsAuthorized(false);
        return;
      }

      if (allowedRoles.indexOf(role) === -1) {
        setIsAuthorized(false);
        return;
      }
    }
    setIsAuthorized(true);
  }, [isAuthReady, userData, setIsAuthorized, allowedRoles, requiresSignOut]);

  return <>{isAuthorized && children}</>;
}
