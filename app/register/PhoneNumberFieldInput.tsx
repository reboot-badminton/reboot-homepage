'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { Field } from './registration';
import { useAuth } from '../components/AuthProvider';

interface Props {
  field: Field<string>;
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

export default function PhoneNumberFieldInput({ field, setError, onUpdate }: Props) {
  const [value, setValue] = useState(field.value);
  const [isFixed, setIsFixed] = useState(field.fixedValue != null);

  const {userData} = useAuth();

  useEffect(() => {
    if (userData == null || field.fixedValue == null) return;

    const fixedValue = field.fixedValue(userData);
    if (fixedValue == null) return;

    setValue(parsePhoneNumber(fixedValue));
    setIsFixed(fixedValue != null);
  }, [userData, field, setValue, setIsFixed]);

  useEffect(() => {
    setError('값을 입력해 주세요');
  }, [setError]);

  const parsePhoneNumber = useCallback((num: string) => {
    // Remove all non-digit characters
    const cleaned = num.replace(/[^0-9]/g, '');

    // Handle different phone number formats
    const match = cleaned.match(
      /^(01[016789]|02|0[3-9][0-9])(\d{3,4})(\d{4})$/
    );
    if (!match) {
      setError('유효하지 않은 전화번호');
      onUpdate(false);
      return num;
    }

    const [, areaCode, firstPart, secondPart] = match;
    setError('');
    onUpdate(true);
    return `${areaCode}-${firstPart}-${secondPart}`;
  }, [setError, onUpdate]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const formattedValue = parsePhoneNumber(e.target.value);
      setValue(formattedValue);
      field.value = formattedValue;
    },
    [field, parsePhoneNumber]
  );

  useEffect(() => {
    field.value = value;
  }, [field, value]);

  return (
    <input
      type="tel"
      maxLength={13}
      className="w-full"
      value={value}
      onChange={handleChange}
      placeholder="010(또는 지역번호)-1234-5678"
      disabled={isFixed}
    />
  );
}
