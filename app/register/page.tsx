'use client';

import { useCallback, useRef } from 'react';
import { Registration } from './registration';
import FieldInput from './FieldInput';
import { firestore } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function Register() {
  const registration = useRef(new Registration());

  const register = useCallback(() => {
    return addDoc(collection(firestore, 'registration'), {
      times: registration.current.times.value,
      name: registration.current.name.value,
      birthday: registration.current.birthday.value,
      phone: registration.current.phone.value,
    });
  }, [registration]);

  const onSubmit = useCallback(() => {
    // TODO: Start loading
    register().then(() => {
      // TODO: End loading
    });
  }, []);

  return (
    <div className="p-2">
      <p className="text-sm mb-4">
        아래 양식을 채운 후, 신청하기 버튼을 눌러주세요. 실무님 확인 후
        회신해드리겠습니다.
      </p>
      <p className="text-xs mb-1 italic">
        별표 (*) 표시된 항목은 필수 입력 항목입니다.
      </p>
      {Object.entries(registration.current).map(([_, field]) => (
        <FieldInput key={'input-' + field.name} field={field} />
      ))}
      <button
        className="w-full py-2 px-4 mt-4 bg-blue-300 rounded-lg text-white transition duration-300 ease-in-out hover:brightness-110"
        onClick={onSubmit}
      >
        신청하기
      </button>
    </div>
  );
}
