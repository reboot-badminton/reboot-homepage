'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app, getRole } from '../firebase/firebase';

enum SignInStatus {
  ADMIN,
  MANAGER,
  MEMBER,
  NONE,
}

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
  const [status, setStatus] = useState<SignInStatus>(SignInStatus.NONE);
  const router = useRouter();

  const updateRole = useCallback(async () => {
    if (!uid) {
      setStatus(SignInStatus.NONE);
      return;
    }

    try {
      const role = await getRole();
      switch (role) {
        case 'manager':
          setStatus(SignInStatus.MANAGER);
          break;
        case 'admin':
          setStatus(SignInStatus.ADMIN);
          break;
        case 'member':
          setStatus(SignInStatus.MEMBER);
          break;
        default:
          setStatus(SignInStatus.NONE);
      }
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      setStatus(SignInStatus.NONE);
    }
  }, [uid]);

  useEffect(() => {
    updateRole();
  }, [updateRole]);

  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch('/api/logout', { method: 'POST' });
    setUid(null);
    setStatus(SignInStatus.NONE);
    router.push('/');
    router.refresh();
  }

  return (
    <>
      {!uid && (
        <Button text="회원 가입" onClick={() => router.push('/signup')} />
      )}
      {!uid && <Button text="로그인" onClick={() => router.push('/login')} />}
      {uid && <Button text="로그아웃" onClick={handleLogout} />}
      {(status === SignInStatus.ADMIN || status === SignInStatus.MANAGER) && (
        <Button text="관리자페이지" onClick={() => router.push('/manage')} />
      )}
    </>
  );
}
