'use client';

import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { app, Role } from '@/firebase';
import { useAuth } from '../providers/AuthProvider';

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
  const { uid, userData } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));
    router.push('/');
    router.refresh();
  }

  return (
    <>
      {!uid && <Button text="로그인" onClick={() => router.push('/login')} />}
      {uid && <Button text="로그아웃" onClick={handleLogout} />}
      {(userData?.role === Role.ADMIN || userData?.role === Role.MANAGER) && (
        <Button text="관리자페이지" onClick={() => router.push('/manage')} />
      )}
    </>
  );
}
