'use client';

import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../firebase';
import ImageSlide from './components/ImageSlide';
import Link from 'next/link';
import Introduction from './components/Introduction';
import MainCoaches from './components/MainCoaches';
import Members from './members';
import { useEffect, useState } from 'react';

interface HomePageProps {
  email?: string|null;
}

const slideImages = Array.from({ length: 4 }, (_, index) => ({
  src: `/slide/${index + 1}.jpeg`,
  alt: `blurred slide Image ${index + 1}`,
}));

export default function HomePage({ email: initialEmail }: HomePageProps) {
  const [email, setEmail] = useState(initialEmail);
  const router = useRouter();
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우, 이메일 상태를 업데이트
        setEmail(user.email);
      } else {
        // 로그아웃한 경우 상태 초기화
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);
  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch('/api/logout');
    setEmail(null);
    router.push('/');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {email && (
        <p className="pt-4">
          안녕하세요 <strong>{email}</strong>님 환영합니다
        </p>
      )}
      <ImageSlide srcs={slideImages} />
      <div className="flex align-middle items-center gap-4 m-5">
        <Link href="/slots" className="button">
          레슨보기
        </Link>
        {!email && (
          <Link href="/register" className="button">
            회원 가입하기
          </Link>
        )}
        {!email && (
          <Link
            href="/login"
            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
          >
            로그인하기
          </Link>
        )}
        {email && (
          <button
            onClick={handleLogout}
            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
          >
            Logout
          </button>
        )}
      </div>
      <hr />
      <Introduction />
      <MainCoaches />
      <Members />
    </main>
  );
}
