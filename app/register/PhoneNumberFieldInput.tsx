'use client';

import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { Field } from './registration';

interface Props {
  field: Field<string>;
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

export default function PhoneNumberFieldInput({ field, setError, onUpdate }: Props) {
  const [inputValue, setInputValue] = useState(field.value);

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
      setInputValue(formattedValue);
      field.value = formattedValue;
    },
    [field, parsePhoneNumber]
  );

  return (
    <input
      type="tel"
      maxLength={13}
      className="w-full"
      value={inputValue}
      onChange={handleChange}
      placeholder="010(또는 지역번호)-1234-5678"
    />
  );
}
