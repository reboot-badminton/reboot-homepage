'use client';

import Dialog from '@/app/components/Dialog';
import TimeSlot from '@/app/data/TimeSlot';
import { useCallback, useRef, useState } from 'react';
import SlotDialogField from '../manage/slots/SlotDialogField';
import SlotDialogDaysField from '../manage/slots/SlotDialotDaysField';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { ConfirmDialogButton } from '../components/DialogButtons';
import { getAuth } from 'firebase/auth';

interface Props {
  slot: TimeSlot;
  onClose: () => void;
}

export default function SlotsDialog({ slot, onClose }: Props) {
  const [inquiry, setInquiry] = useState(''); // 문의사항 상태
  const titleRef = useRef(slot.title);
  const daysRef = useRef<number[]>(slot.days);
  const capacityRef = useRef(slot.capacity);
  const lessonMonthRef = useRef(slot.lessonMonth);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const registerInquire = useCallback(async () => {
    try {
      setIsRegistering(true);
      const user = getAuth().currentUser;
      if (!user) {
        setError('로그인이 필요합니다.');
        setIsRegistering(false);
        return;
      }
      const result = await getDoc(doc(firestore, 'users', user.uid));
      const userInfo = result.data();

      if (!userInfo) {
        setError('사용자 정보를 불러올 수 없습니다.');
        setIsRegistering(false);
        return;
      }

      const registrationId = `${lessonMonthRef.current.year}-${lessonMonthRef.current.month}-${titleRef.current}`;
      const registrationRef = doc(firestore, 'registration', registrationId);
      const registrationSnapshot = await getDoc(registrationRef);

      const newUserData = {
        uid: user.uid,
        inquiry,
        createdAt: new Date(),
        ...userInfo,
      };
      const { price, coach, ...slotWithoutPrice } = slot;

      if (registrationSnapshot.exists()) {
        // 이미 문의한 사용자인지 확인
        const registeredUsers = registrationSnapshot.data()?.users ?? [];
        const hasAlreadyInquired = registeredUsers.some(
          ({ uid }: { uid: string }) => uid === user.uid
        );

        if (hasAlreadyInquired) {
          setError('이미 이 레슨에 문의하였습니다.');
          setIsRegistering(false);
          return;
        }

        await updateDoc(registrationRef, {
          users: arrayUnion(newUserData),
        });
      } else {
        // 문서가 없는 경우, 새로 생성
        await setDoc(registrationRef, {
          times: {
            ...slotWithoutPrice,
          },
          users: [newUserData], // 새로운 유저 리스트로 생성
          createdAt: new Date(),
        });
      }

      setIsRegistering(false);
      setIsSuccess(true);
      setError('');
    } catch (e) {
      console.error(e);
      setError('문의 등록 중 오류가 발생했습니다.');
      setIsRegistering(false);
    }
  }, [inquiry, slot]);

  return (
    <Dialog>
      <div className="w-64 text-sm mx-4 mt-4 mb-2">
        <SlotDialogField
          title=""
          valueRef={titleRef}
          isEditMode={false}
          className="text-base mb-2"
        />
        <SlotDialogDaysField daysRef={daysRef} isEditMode={false} />
        <SlotDialogField
          title="정원"
          valueRef={capacityRef}
          suffix="명"
          isEditMode={false}
        />
        <div className="mt-2">
          <span className="block">
            <b>현재 레슨생</b> ({slot.students.length}명)
          </span>
          <span>{slot.students.join(', ')}</span>
        </div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mt-2">
          <label
            htmlFor="inquiry"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            문의 사항
          </label>
          <textarea
            id="inquiry"
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="문의사항을 입력하세요."
          />
        </div>
        <div className="text-right">
          <div
            className="p-2 font-bold text-gray-500"
            onClick={registerInquire}
          >
            문의하기
          </div>
          <div
            className="p-2 font-bold text-gray-500"
            onClick={() => onClose()}
          >
            닫기
          </div>
        </div>
      </div>
      {isRegistering && <Dialog text="신청중입니다" useDotAnimation={true} />}
      {isSuccess && (
        <Dialog text="신청 완료했습니다." useDotAnimation={false}>
          <div className="text-right pr-2">
            <ConfirmDialogButton onClick={() => onClose()} />
          </div>
        </Dialog>
      )}
    </Dialog>
  );
}
