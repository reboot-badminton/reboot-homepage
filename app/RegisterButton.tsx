'use client';

import Link from 'next/link';
import { useAuth } from './providers/AuthProvider';
import { Role } from '@/firebase';

export default function RegisterButton() {
  const { userData } = useAuth();

  return (
    <div className="border-white border-2 text-xl mobile:px-4 mobile:py-2 px-8 py-4 transition-all hoverable:hover:scale-110 active:scale-110 cursor-pointer backdrop-blur">
      {userData?.role !== Role.BANNED &&
        <Link href="/register">레슨 신청하기</Link>
      }
    </div>
  );
}