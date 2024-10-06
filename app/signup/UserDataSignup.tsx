'use client';

import { getAuth, signOut } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { app, Role, toRole } from '../../firebase';
import { useDialog } from '../providers/DialogProvider';
import { validatePhone } from './validate';

export default function UserDataSignup({ uid }: { uid: string }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const {showDialog} = useDialog();
  const firestore = getFirestore(app);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user == null || user.uid !== uid) {
      signOut(auth);
      router.back();
    }

    setEmail(user?.email ?? '');
  }, [uid]);

  async function signupUserData() {
    try {
      const user = getAuth().currentUser;
      if (user == null) {
        router.back();
      }

      await setDoc(doc(firestore, 'users', user!.uid), {
        name,
        gender,
        birthday,
        phone,
        email,
        role: toRole(Role.MEMBER),
      });
    } catch (error) {
      setError((error as Error).message);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    try {
      validatePhone(phone);
    } catch (e) {
      setError((e as Error).message);
      return;
    }

    await signupUserData();

    showDialog({
      title: '회원 가입이 완료되었습니다.',
      body: '회원 가입한 계정으로 다시 로그인해 주세요.',
      onConfirm: () => {
        router.push('/login');
        return true;
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-6"
      action="#"
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          이름
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="홍길동"
          required
        />
      </div>
      <div>
        <label
          htmlFor="gender"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          성별
        </label>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="" disabled>
            선택
          </option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="birthday"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          생년월일
        </label>
        <input
          type="date"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          id="birthday"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          휴대폰 번호
        </label>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="01012345678"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          이메일
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email@naver.com"
          required
          disabled
        />
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <button
        type="submit"
        className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
      >
        가입하기
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        이미 계정이 있으신가요?
        <Link
          href="/login"
          className="ml-2 font-medium text-gray-600 hover:underline dark:text-gray-500"
        >
          로그인하기
        </Link>
      </p>
    </form>
  );
}
