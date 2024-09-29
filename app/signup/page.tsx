import { PropsWithChildren } from 'react';
import EmailSignup from './EmailSignup';
import GoogleSignup from './GoogleSignup';

function SignupLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            회원 가입
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
}

export default async function Signup({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const uid = searchParams['uid'] as string | null;

  if (uid == null) {
    return (
      <SignupLayout>
        <EmailSignup />
      </SignupLayout>
    );
  }

  return (
    <SignupLayout>
      <GoogleSignup uid={uid} />
    </SignupLayout>
  );
}
