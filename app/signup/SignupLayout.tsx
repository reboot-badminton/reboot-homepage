'use client';

import Authentication from '@/components/authentication/Authentication';
import { getUserData } from '@/firebase';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useCallback, useState } from 'react';
import UserDataSignup from './UserDataSignup';
import AuthLayout from '@/components/authentication/AuthLayout';

export default function SignupLayout({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [uid, setUid] = useState(searchParams.get('uid'));

  const onUserSignedIn = useCallback(
    async (user: User) => {
      const userData = await getUserData();
      if (userData != null) {
        // Already signed up
        router.back();
      }

      setUid(user.uid);
    },
    [setUid]
  );

  return (
    <AuthLayout title="회원 가입">
      {uid != null && <UserDataSignup uid={uid} />}
      {uid == null && (
        <>
          <Authentication
            emailVerificationText="이메일 인증"
            googleVerificationText="구글 계정으로 회원가입"
            onUserSignedIn={onUserSignedIn}
          />
          <p className="text-sm font-light text-gray-500">
            이미 계정이 있으신가요?
            <Link
              href="/login"
              className="ml-2 font-medium text-gray-600 hoverable:hover::underline active:underline"
              replace={true}
            >
              로그인하기
            </Link>
          </p>
        </>
      )}
      {children}
    </AuthLayout>
  );
}
