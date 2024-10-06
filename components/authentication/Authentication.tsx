'use client';

import EmailVerification from '@/components/authentication/EmailVerification';
import GoogleButton from './GoogleButton';
import { User } from 'firebase/auth';
import { useState } from 'react';

interface Props {
  emailVerificationText: string;
  googleVerificationText: string;
  onUserSignedIn: (user: User) => void;
}

export default function Authentication({
  emailVerificationText,
  googleVerificationText,
  onUserSignedIn,
}: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  
  return (
    <>
      <EmailVerification
        onVerified={onUserSignedIn}
        verificationText={emailVerificationText}
        setErrorMessage={setErrorMessage}
      />
      <GoogleButton
        onSignedIn={onUserSignedIn}
        text={googleVerificationText}
        setErrorMessage={setErrorMessage}
      />
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-xs"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
    </>
  );
}
