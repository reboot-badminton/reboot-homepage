import { Suspense } from 'react';
import SignupLayout from './SignupLayout';
import Authorized from '../../components/Authorized';

export default function Signup() {
  return (
    <Authorized requiresSignOut={true} unauthorizedText='이미 로그인 되어 있습니다'>
      <Suspense>
        <SignupLayout />
      </Suspense>
    </Authorized>
  );
}
