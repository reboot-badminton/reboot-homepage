import GoogleButton from '@/components/GoogleButton';
import { app, firestore } from '@/firebase';
import { getAuth, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useDialog } from '../providers/DialogProvider';

interface Props {
  onSuccess: (user: User) => void;
  onError: (error: string) => void;
}

export default function GoogleSigninButton({ onSuccess, onError }: Props) {
  const router = useRouter();
  const { showDialog } = useDialog();

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

        showDialog({
          title: '회원가입이 필요합니다',
          body: '서비스 이용을 위해 간편 회원가입을 하시겠습니까?',
          onCancel: async () => {
            await signOut(getAuth(app));
            router.back();
            return true;
          },
          onConfirm: () => {
            router.push(`/signup?uid=${uidRef.current}`);
            return true;
          },
        });
      } else {
        onSuccess(user);
      }
    } catch (e) {
      onError((e as Error).message)
    }
  }

  return (
    <GoogleButton
      onSignedIn={onSignedIn}
      text="구글 계정으로 로그인"
    />
  );
}