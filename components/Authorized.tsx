'use client';

import { Role } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../app/providers/AuthProvider';
import { useDialog } from '../app/providers/DialogProvider';

interface Props {
  requiresSignOut?: boolean;
  allowedRoles?: Role[];
  onlyCheckEntry?: boolean;
  unauthorizedText?: string;
  onUnauthorized?: () => void;
}

export default function Authorized({
  requiresSignOut,
  allowedRoles,
  onlyCheckEntry,
  unauthorizedText,
  onUnauthorized,
  children,
}: PropsWithChildren<Props>) {
  const { userData, isAuthReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { showDialog } = useDialog();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isEntry, setIsEntry] = useState(true);

  useEffect(() => {
    if (!isAuthReady || isAuthorized == null) {
      return;
    }

    if (isAuthorized || (!isEntry && onlyCheckEntry)) {
      setIsEntry(false);
      return;
    }
    setIsEntry(false);

    if (onUnauthorized == null) {
      showDialog({
        title: unauthorizedText ?? '접근 권한이 없습니다',
        onConfirm: () => {
          router.back();
          return true;
        },
      });
      return;
    }
    onUnauthorized();
  }, [router, onUnauthorized, pathname, isAuthReady, isAuthorized, isEntry, onlyCheckEntry]);

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
