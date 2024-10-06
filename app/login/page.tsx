'use client';

import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EmailVerification from '../signup/EmailVerification';
import GoogleSigninButton from './GoogleSigninButton';
import Authorized from '../Authorized';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSuccessfulLogin(user: User) {
    setError('');
    router.push('/');
    router.refresh();
  }

  return (
    <Authorized requiresSignOut={true}>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              로그인
            </h1>
            <div className="space-y-4 md:space-y-6">
              <EmailVerification
                onVerified={handleSuccessfulLogin}
                verificationText='로그인하기' />
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <GoogleSigninButton
                onSuccess={handleSuccessfulLogin}
                onError={(error) => setError(error)}
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                계정이 없으신가요?
                <Link
                  href="/signup"
                  className="ml-4 font-medium text-gray-600 hover:underline dark:text-gray-500"
                >
                  회원가입하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </Authorized>
  );
}
