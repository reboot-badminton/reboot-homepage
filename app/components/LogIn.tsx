'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app, getRole, Role } from '../firebase/firebase';

function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <div
      className="mb-4 ml-4 text-xs text-gray-300 inline-block cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default function LogIn() {
  const [uid, setUid] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(Role.NONE);
  const router = useRouter();

  const updateRole = useCallback(async () => {
    if (!uid) {
      setRole(Role.NONE);
      return;
    }

    try {
      const role = await getRole();
      setRole(role)
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      setRole(Role.NONE);
    }
  }, [uid]);

  useEffect(() => {
    updateRole();
  }, [updateRole]);

  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch('/api/logout', { method: 'POST' });
    setUid(null);
    setRole(Role.NONE);
    router.push('/');
    router.refresh();
  }

  return (
    <>
      {!uid && <Button text="로그인" onClick={() => router.push('/login')} />}
      {uid && <Button text="로그아웃" onClick={handleLogout} />}
      {(role === Role.ADMIN || role === Role.MANAGER) && (
        <Button text="관리자페이지" onClick={() => router.push('/manage')} />
      )}
    </>
  );
}
