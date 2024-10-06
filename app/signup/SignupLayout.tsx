'use client';

import GoogleButton from '@/components/GoogleButton';
import { getUserData } from '@/firebase';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useCallback, useState } from 'react';
import EmailVerification from './EmailVerification';
import UserDataSignup from './UserDataSignup';

export default function SignupLayout({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [uid, setUid] = useState(searchParams.get('uid'));

  const onUserSignedIn = useCallback(async (user: User) => {
    const userData = await getUserData();
    if (userData != null) {
      // Already signed up
      router.back();
    }

    setUid(user.uid);
  }, [setUid]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            회원 가입
          </h1>
          {uid != null && <UserDataSignup uid={uid} />}
          {uid == null && <>
            <EmailVerification onVerified={onUserSignedIn} verificationText='이메일 인증' />
            <GoogleButton onSignedIn={onUserSignedIn} text="구글 계정으로 회원가입" />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              이미 계정이 있으신가요?
              <Link
                href="/login"
                className="ml-2 font-medium text-gray-600 hover:underline dark:text-gray-500"
              >
                로그인하기
              </Link>
            </p>
          </>}
          {children}
        </div>
      </div>
    </main>
  );
}
