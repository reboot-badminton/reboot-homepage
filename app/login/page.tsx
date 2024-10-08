'use client';

import AuthLayout from '@/components/authentication/AuthLayout';
import Authentication from '@/components/authentication/Authentication';
import { app, firestore } from '@/firebase';
import { User, getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDialog } from '../providers/DialogProvider';

export default function Login() {
  const router = useRouter();
  const { showDialog } = useDialog();

  const isSignedUp = useCallback(async (uid: string) => {
    const snapshot = await getDoc(doc(firestore, 'users', uid));
    if (!snapshot.exists()) {
      return false;
    }

    const data = snapshot.data();
    return !!data.birthday && !!data.email && !!data.gender && !!data.name && !!data.phone;
  }, []);

  const onUserSignedIn = useCallback(async (user: User) => {
    if (await isSignedUp(user.uid)) {
      showDialog({
        title: '성공적으로 로그인했습니다',
        onConfirm: () => {
          router.back();
          return true;
        },
      });
    } else {
      showDialog({
        title: '가입되어 있지 않은 이메일입니다',
        body: '서비스 이용을 위해 간편 회원가입을 하시겠습니까?',
        onCancel: async () => {
          signOut(getAuth(app));
          router.back();
          return true;
        },
        onConfirm: () => {
          router.push(`/signup?uid=${user.uid}`);
          return true;
        },
      });
    }
  }, [isSignedUp, router]);

  return (
    <AuthLayout title="로그인">
      <Authentication
        emailVerificationText="이메일로 로그인"
        googleVerificationText="구글 계정으로 로그인"
        onUserSignedIn={onUserSignedIn} />
      <p className="text-sm font-light text-gray-500">
        계정이 없으신가요?
        <Link
          href="/signup"
          className="ml-4 font-medium text-gray-600 hoverable:hover:underline active:underline"
          replace={true}
        >
          회원가입하기
        </Link>
      </p>
    </AuthLayout>
  );
}
