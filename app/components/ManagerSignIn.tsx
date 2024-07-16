'use client';

import { useRouter } from 'next/navigation';
import { getRole, managerSignIn } from '../firebase/firebase';

export default function ManagerSignIn() {
  const router = useRouter();

  return (
    <div
      className='mb-4 text-xs text-gray-300'
      onClick={async () => {
        if (!(await managerSignIn())) return;
        const role = await getRole();
        if (role === 'admin' || role === 'manager') {
          router.push('/manage');
        }
      }}
    >
      관리자 로그인
    </div>
  );
}
