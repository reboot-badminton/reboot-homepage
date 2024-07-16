'use client';

import { useRouter } from 'next/navigation';
import { getRole, managerSignIn } from '../firebase/firebase';
import { useCallback, useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

enum SignInStatus {
  SIGNED_OUT,
  SIGNED_IN,
  SIGNED_IN_MANAGER,
  SIGNED_IN_ADMIN,
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

export default function ManagerSignIn() {
  const router = useRouter();
  const [status, setStatus] = useState(SignInStatus.SIGNED_OUT);

  const updateRole = useCallback(async () => {
    const role = await getRole();

    switch (role) {
      case 'manager':
        setStatus(SignInStatus.SIGNED_IN_MANAGER);
        break;
      case 'admin':
        setStatus(SignInStatus.SIGNED_IN_ADMIN);
        break;
      default:
        if (getAuth().currentUser == null) {
          setStatus(SignInStatus.SIGNED_OUT);
        } else {
          setStatus(SignInStatus.SIGNED_IN);
        }
        break;
    }

    return role;
  }, []);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(() => {
      updateRole();
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {status === SignInStatus.SIGNED_OUT && (
        <Button
          text="관리자 로그인"
          onClick={async () => {
            if (status === SignInStatus.SIGNED_OUT) {
              if (!(await managerSignIn())) return;
            }

            const role = await updateRole();
            if (role === 'admin' || role === 'manager') {
              router.push('/manage');
            }
          }}
        />
      )}
      {(status === SignInStatus.SIGNED_IN_MANAGER ||
        status === SignInStatus.SIGNED_IN_ADMIN) && (
        <Button text="관리자 페이지" onClick={() => router.push('/manage')} />
      )}
      {status !== SignInStatus.SIGNED_OUT && (
        <Button
          text="로그아웃"
          onClick={async () => {
            await signOut(getAuth());
            router.push('/');
          }}
        />
      )}
    </>
  );
}
