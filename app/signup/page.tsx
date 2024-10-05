import { Suspense } from 'react';
import SignupLayout from './SignupLayout';
import Authorized from '../components/Authorized';

export default function Signup() {
  return (
    <Authorized requiresSignOut={true}>
      <Suspense>
        <SignupLayout />
      </Suspense>
    </Authorized>
  );
}
