'use client';

import Authentication from '@/components/authentication/Authentication';
import { getUserData } from '@/firebase';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useCallback, useState } from 'react';
import UserDataSignup from './UserDataSignup';

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
    <main className="flex flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            회원 가입
          </h1>
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
                  className="ml-2 font-medium text-gray-600 hover:underline"
                >
                  로그인하기
                </Link>
              </p>
            </>
          )}
          {children}
        </div>
      </div>
    </main>
  );
}
