import { Suspense } from 'react';
import SignupLayout from './SignupLayout';

export default function Signup() {
  return (
    <Suspense>
      <SignupLayout />
    </Suspense>
  );
}
