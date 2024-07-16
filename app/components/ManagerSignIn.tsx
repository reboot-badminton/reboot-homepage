'use client';

import { managerSignIn } from '../firebase/firebase';

export default function ManagerSignIn() {
  return (
    <div
      className='mb-4 text-xs text-gray-300'
      onClick={() => {
        managerSignIn();
      }}
    >
      관리자 로그인
    </div>
  );
}
