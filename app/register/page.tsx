'use client';

import { useCallback, useRef, useState } from 'react';
import { Field, Registration } from './registration';
import FieldInput from './FieldInput';
import { addDoc, collection } from 'firebase/firestore';
import Dialog from '../components/Dialog';
import { useRouter } from 'next/navigation';
import { ConfirmDialogButton } from '../components/DialogButtons';
import { firestore } from '@/firebase';

export default function Register() {
  const router = useRouter();
  const registration = useRef(new Registration());
  const [showError, setShowError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const fieldIsValidMap = useRef(new Map<string, boolean>());

  const register = useCallback(() => {
    const data: {
      [index: string]: any;
    } = {};
    Object.entries(registration.current).forEach(([key, field]) => {
      data[key] = field.value;
    });
    return addDoc(collection(firestore, 'registration'), data);
  }, [registration]);

  const validate = useCallback(() => {
    const isInvalid = !!Object.values(registration.current).find(
      (field: Field<any>) => field.isRequired && !field.value
    );
    if (isInvalid) {
      setShowError(true);
      return false;
    }
    return true;
  }, []);

  const onSubmit = useCallback(() => {
    if (!validate()) return;
    setIsRegistering(true);
    register().then(() => {
      setIsRegistering(false);
      setIsSuccess(true);
    });
  }, [register, validate]);

  const checkFormValidity = useCallback(() => {
    let isValid = true;
    for (const [name, field] of Object.entries(registration.current)) {
      if (!field.isRequired) continue;

      if (fieldIsValidMap.current.get(name) != true) {
        isValid = false;
        break;
      }
    }

    setIsValid(isValid);
  }, [registration, fieldIsValidMap, setIsValid]);

  return (
    <div className="p-2">
      <p className="text-sm mb-4">
        아래 양식을 채운 후, 신청하기 버튼을 눌러주세요. 매니저님 확인 후
        회신해드리겠습니다.
      </p>
      <p className="text-xs mb-1 italic">
        별표 (*) 표시된 항목은 필수 입력 항목입니다.
      </p>
      {Object.entries(registration.current).map(([name, field]) => (
        <FieldInput
          key={'input-' + field.name}
          field={field}
          showError={showError}
          onUpdate={(isValid) => {
            fieldIsValidMap.current.set(name, isValid);
            checkFormValidity();
          }}
        />
      ))}
      <button className="w-full mt-4" onClick={onSubmit} disabled={!isValid}>
        신청하기
      </button>
      {isRegistering && <Dialog text="신청중입니다" useDotAnimation={true} />}
      {isSuccess && (
        <Dialog text="신청 완료했습니다." useDotAnimation={false}>
          <div className="text-right pr-2">
            <ConfirmDialogButton
              onClick={() => {
                router.back();
              }}
            />
          </div>
        </Dialog>
      )}
    </div>
  );
}
