import EmailVerification from '@/components/authentication/EmailVerification';
import GoogleButton from './GoogleButton';
import { User } from 'firebase/auth';

interface Props {
  emailVerificationText: string;
  googleVerificationText: string;
  onUserSignedIn: (user: User) => void;
  setErrorMessage: (errorMessage: string) => void;
}

export default function Authentication({
  emailVerificationText,
  googleVerificationText,
  onUserSignedIn,
  setErrorMessage,
}: Props) {
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
    </>
  );
}
