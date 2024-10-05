'use client';

import Link from 'next/link';
import { useAuth } from './components/AuthProvider';
import { Role } from '@/firebase';

export default function RegisterButton() {
  const { userData } = useAuth();

  return (
    <div className="text-center m-5 h-6">
      {userData?.role !== Role.BANNED &&
        <Link href="/register" className="button">
          레슨 신청하기
        </Link>
      }
    </div>
  );
}