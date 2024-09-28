'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebase';
import { useAuth } from './AuthProvider';

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
  const { uid, role } = useAuth();
  const [status, setStatus] = useState<SignInStatus>(SignInStatus.NONE);
  const router = useRouter();

  useEffect(() => {
    if (!uid) {
      setStatus(SignInStatus.NONE);
      return;
    }

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
  }, [uid, role]);

  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch('/api/logout', { method: 'POST' });
    setStatus(SignInStatus.NONE);
    router.push('/');
    router.refresh();
  }

  return (
    <>
      {!uid && <Button text="로그인" onClick={() => router.push('/login')} />}
      {uid && <Button text="로그아웃" onClick={handleLogout} />}
      {(status === SignInStatus.ADMIN || status === SignInStatus.MANAGER) && (
        <Button text="관리자페이지" onClick={() => router.push('/manage')} />
      )}
    </>
  );
}
