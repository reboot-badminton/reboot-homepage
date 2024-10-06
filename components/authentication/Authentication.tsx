import EmailVerification from '@/components/authentication/EmailVerification';
import GoogleButton from './GoogleButton';
import { User } from 'firebase/auth';

interface Props {
  emailVerificationText: string;
  googleVerificationText: string;
  onUserSignedIn: (user: User) => void;
  onError: (errorMessage: string) => void;
}

export default function Authentication({
  emailVerificationText,
  googleVerificationText,
  onUserSignedIn,
  onError,
}: Props) {
  return (
    <>
      <EmailVerification
        onVerified={onUserSignedIn}
        verificationText={emailVerificationText}
        onError={onError}
      />
      <GoogleButton
        onSignedIn={onUserSignedIn}
        text={googleVerificationText}
        onError={onError}
      />
    </>
  );
}
