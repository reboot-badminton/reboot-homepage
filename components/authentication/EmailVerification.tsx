'use client';

import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

enum State {
  REQUEST,
  PENDING,
  VERIFICATION,
  VERIFIED,
}

interface Props {
  onVerified: (user: User) => void;
  verificationText: string;
}

export default function EmailVerification({ onVerified, verificationText }: Props) {
  const [state, setState] = useState<State>(State.REQUEST);
  const [email, setEmail] = useState('');
  const [isEmailFromLocalStorage, setIsEmailFromLocalStorage] = useState(false);

  const sendVerification = useCallback(() => {
    sendSignInLinkToEmail(getAuth(), email, {
      url: window.location.href,
      handleCodeInApp: true,
    })
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

    await signInWithEmailLink(getAuth(), email, window.location.href);
    window.localStorage.removeItem('emailForSignIn');
    setState(State.VERIFIED);
  }, [email]);

  const onSubmit = useCallback(() => {
    switch (state) {
      case State.REQUEST:
        sendVerification();
        break;
      case State.PENDING:
        const user = getAuth().currentUser;
        if (user != null) {
          onVerified(user);
        }
        break;
      case State.VERIFICATION:
        verify();
        break;
      case State.VERIFIED:
        window.close();
        break;
    }
  }, [state, email, sendVerification, verify]);

  useEffect(() => {
    if (isSignInWithEmailLink(getAuth(), window.location.href)) {
      setState(State.VERIFICATION);

      const email = window.localStorage.getItem('emailForSignIn');
      if (email) {
        setEmail(email);
        setIsEmailFromLocalStorage(true);
      }
    }
  }, [setState]);

  return (
    <div className="space-y-4 md:space-y-6">
      {state !== State.VERIFIED && <div>
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
          disabled={state !== State.REQUEST || isEmailFromLocalStorage}
        />
      </div>}
      {state === State.PENDING && <div>인증 이메일을 발송했습니다.<br />인증 완료 후 아래 버튼을 눌러주세요.</div>}
      {state === State.VERIFIED && <div>이메일 인증이 완료되었습니다.<br />이전 페이지로 돌아가주세요.</div>}
      <button
        onClick={onSubmit}
        className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
        disabled={!email}
      >
        {state === State.REQUEST && <>{verificationText}</>}
        {state === State.PENDING && <>인증 완료</>}
        {state === State.VERIFICATION && <>이메일 인증 완료하기</>}
        {state === State.VERIFIED && <>창 닫기</>}
      </button>
    </div>
  );
}