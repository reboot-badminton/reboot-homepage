'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app, getRole } from '@/firebase';

enum SignInStatus {
  ADMIN,
  MANAGER,
  MEMBER,
  NONE,
}

interface LogInProps {
  email?: string | null;
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

export default function LogIn({ email: initialEmail }: LogInProps) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<SignInStatus>(SignInStatus.NONE);
  const router = useRouter();

  const updateRole = useCallback(async () => {
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
    }

    return role;
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우, 이메일 상태를 업데이트
        setEmail(user.email);
      } else {
        // 로그아웃한 경우 상태 초기화
        setEmail(null);
      }
      updateRole();
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch('/api/logout', { method: 'POST' });
    setEmail(null);
    setStatus(SignInStatus.NONE);
    router.push('/');
    router.refresh();
  }

  return (
    <>
      {!email && (
        <Button text="회원 가입" onClick={() => router.push('/register')} />
      )}
      {!email && <Button text="로그인" onClick={() => router.push('/login')} />}
      {email && <Button text="로그아웃" onClick={handleLogout} />}
      {(status === SignInStatus.ADMIN || status === SignInStatus.MANAGER) && (
        <Button text="관리자페이지" onClick={() => router.push('/manage')} />
      )}
    </>
  );
}
