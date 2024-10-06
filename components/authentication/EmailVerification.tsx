'use client';

import Authorized from '@/app/Authorized';
import { useDialog } from '@/app/providers/DialogProvider';
import { firestore } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  User,
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
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
  setErrorMessage: (errorMessage: string) => void;
}

const BUTTON_DELAY_AFTER_VERIFICATION_SEND_MS = 10000;

function getErrorMessage(errorCode: string) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return '유효한 이메일 주소를 입력해주세요.';
    case 'auth/auth/invalid-action-code':
      return '유효한 코드를 입력해주세요.';
    default:
      return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
}

export default function EmailVerification({
  onVerified,
  verificationText,
  setErrorMessage,
}: Props) {
  const [state, setState] = useState<State>(State.REQUEST);
  const [email, setEmail] = useState('');
  const [isEmailFromLocalStorage, setIsEmailFromLocalStorage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { showDialog } = useDialog();

  const sendVerification = useCallback(() => {
    sendSignInLinkToEmail(getAuth(), email, {
      url: window.location.href,
      handleCodeInApp: true,
    })
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        setErrorMessage('');
        setState(State.PENDING);
        setIsButtonDisabled(true);
        const timer = setTimeout(() => {
          setIsButtonDisabled(false);
        }, BUTTON_DELAY_AFTER_VERIFICATION_SEND_MS);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.error('Error sending verification email:', error);
        setErrorMessage(getErrorMessage(error.code));
      });
  }, [email]);

  const uploadEmailLink = useCallback(async () => {
    const emailLink = window.location.href;
    await setDoc(doc(firestore, 'emailVerifications', email), { emailLink });
  }, [email]);

  const emailLinkSignIn = useCallback(async () => {
    const emailLinkDoc = doc(firestore, 'emailVerifications', email);
    const emailLinkSnapshot = await getDoc(emailLinkDoc);
    const emailLink = emailLinkSnapshot.data()?.emailLink;

    if (emailLink == null) {
      showDialog({
        title: '이메일 인증 정보를 불러올 수 없습니다.',
        body: '다시 시도해 주세요.',
        onConfirm: () => {
          window.location.reload();
          return true;
        },
      });
      return;
    }
    try {
      await signInWithEmailLink(getAuth(), email, emailLink);
      const user = getAuth().currentUser;
      if (user != null) {
        await deleteDoc(emailLinkDoc);
        onVerified(user);
      }
    } catch (error) {
      console.error('Error :', error);
      const firebaseError = error as FirebaseError;
      setErrorMessage(getErrorMessage(firebaseError.code));
    }
  }, [email]);

  const verify = useCallback(async () => {
    if (state !== State.VERIFICATION) return;

    await uploadEmailLink();

    window.localStorage.removeItem('emailForSignIn');
    setState(State.VERIFIED);
  }, [email]);

  const onSubmit = useCallback(() => {
    switch (state) {
      case State.REQUEST:
        sendVerification();
        break;
      case State.PENDING:
        emailLinkSignIn();
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
      if (email != null && email?.length > 0) {
        setEmail(email);
        setIsEmailFromLocalStorage(true);
      }
    }
  }, [setState]);

  return (
    <div className="space-y-4 md:space-y-6">
      <Authorized requiresSignOut={state === State.REQUEST} />
      {state !== State.VERIFIED && (
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            이메일
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="email@naver.com"
            required
            disabled={state !== State.REQUEST && isEmailFromLocalStorage}
          />
        </div>
      )}
      {state === State.PENDING && (
        <div>
          인증 이메일을 발송했습니다.
          <br />
          인증 완료 후 아래 버튼을 눌러주세요.
        </div>
      )}
      {state === State.VERIFIED && (
        <div>
          이메일 인증이 완료되었습니다.
          <br />
          기존 화면으로 돌아가 인증 완료 버튼을 눌러주세요.
        </div>
      )}
      <button
        onClick={onSubmit}
        className="w-full"
        disabled={!email || isButtonDisabled}
      >
        {state === State.REQUEST && <>{verificationText}</>}
        {state === State.PENDING && <>인증 완료</>}
        {state === State.VERIFICATION && <>이메일 인증 완료하기</>}
        {state === State.VERIFIED && <>창 닫기</>}
      </button>
    </div>
  );
}
