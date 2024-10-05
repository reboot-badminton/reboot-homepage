import { app, firestore } from '@/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Dialog from '../components/Dialog';
import { CancelDialogButton, ConfirmDialogButton } from '../components/DialogButtons';
import GoogleButton from '../components/GoogleButton';

interface Props {
  onSuccess: (user: User) => void;
  onError: (error: string) => void;
}

export default function GoogleSigninButton({ onSuccess, onError }: Props) {
  const router = useRouter();
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  const uidRef = useRef<string>('');

  async function isSignedUp(uid: string): Promise<boolean> {
    const snapshot = await getDoc(doc(firestore, 'users', uid));
    if (!snapshot.exists()) {
      return false;
    }

    const data = snapshot.data();
    return !!data.birthday && !!data.email && !!data.gender && !!data.name && !!data.phone;
  }

  async function onSignedIn(user: User) {
    try {
      if (!await isSignedUp(user.uid)) {
        uidRef.current = user.uid;
        setShowSignupDialog(true);
      } else {
        onSuccess(user);
      }
    } catch (e) {
      onError((e as Error).message)
    }
  }

  return (
    <>
      <GoogleButton
        onSignedIn={onSignedIn}
        text="구글 계정으로 로그인"
      />
      {showSignupDialog &&
        <Dialog>
          <div className='m-2'>
            <div className='font-bold text-lg'>회원가입이 필요합니다</div>
            <div className='mt-2 p-1'>서비스 이용을 위해 간편 회원가입을 하시겠습니까?</div>
          </div>
          <div className='flex flex-row-reverse'>
            <ConfirmDialogButton onClick={() => {
              router.push(`/signup?uid=${uidRef.current}`);
            }} />
            <CancelDialogButton onClick={async () => {
              await signOut(getAuth(app));
              router.back();
            }} />
          </div>
        </Dialog>}
    </>
  );
}