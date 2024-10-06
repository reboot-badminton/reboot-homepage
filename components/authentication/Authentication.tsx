import EmailVerification from '@/components/authentication/EmailVerification';
import GoogleButton from './GoogleButton';
import { User } from 'firebase/auth';

interface Props {
  emailVerificationText: string;
  googleVerificationText: string;
  onUserSignedIn: (user: User) => void;
}

export default function Authentication({ emailVerificationText, googleVerificationText, onUserSignedIn }: Props) {
  return (
    <>
      <EmailVerification onVerified={onUserSignedIn} verificationText={emailVerificationText} />
      <GoogleButton onSignedIn={onUserSignedIn} text={googleVerificationText} />
    </>
  );
}
