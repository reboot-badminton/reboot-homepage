'use client';

import { useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';
import GoogleSignup from './GoogleSignup';
import EmailSignup from './EmailSignup';

export default function SignupLayout({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            회원 가입
          </h1>
          {uid != null && <GoogleSignup uid={uid} />}
          {uid == null && <EmailSignup />}
          {children}
        </div>
      </div>
    </main>
  );
}
