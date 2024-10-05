'use client';

import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

const actionCodeSettings = {
  url: 'https://automatic-halibut-wr9q4wr7x99295wr-3000.app.github.dev/signup',
  handleCodeInApp: true,
};

enum State {
  REQUEST,
  PENDING,
  VERIFICATION,
}

interface Props {
  onVerified: (user: User) => void;
}

export default function EmailVerification({ onVerified }: Props) {
  const [state, setState] = useState<State>(State.REQUEST);
  const [email, setEmail] = useState('');

  const sendVerification = useCallback(() => {
    sendSignInLinkToEmail(getAuth(), email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        setState(State.PENDING);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, [email]);

  const verify = useCallback(async () => {
    if (state !== State.VERIFICATION) return;

    const userCredential = await signInWithEmailLink(getAuth(), email, window.location.href);
    window.localStorage.removeItem('emailForSignIn');
    onVerified(userCredential.user);
  }, [email]);

  const onSubmit = useCallback(() => {
    switch (state) {
      case State.REQUEST:
        sendVerification();
        break;
      case State.VERIFICATION:
        verify();
        break;
    }
  }, [state, email, sendVerification, verify]);

  useEffect(() => {
    if (isSignInWithEmailLink(getAuth(), window.location.href)) {
      setState(State.VERIFICATION);

      const email = window.localStorage.getItem('emailForSignIn');
      if (email) {
        setEmail(email);
      }
    }
  }, [setState]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          이메일
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email@naver.com"
          required
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
        disabled={state === State.PENDING}
      >
        {state === State.REQUEST && <>이메일 인증</>}
        {state === State.PENDING && <>인증 이메일을 발송했습니다</>}
        {state === State.VERIFICATION && <>이메일 인증 완료하기</>}
      </button>
    </div>
  );
}