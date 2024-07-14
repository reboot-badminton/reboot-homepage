'use client';

import { useState, useCallback, ChangeEvent } from 'react';
import { Field } from './registration';

interface Props {
  field: Field<string>;
}


export default function PhoneNumberFieldInput({ field }: Props) {
  const [inputValue, setInputValue] = useState(field.value);
  const [error, setError] = useState<string | null>(null);

  const parsingPhoneNumber = useCallback((num: string) => {
    // Remove all non-digit characters
    const cleaned = num.replace(/[^0-9]/g, '');

    // Handle different phone number formats
    const match = cleaned.match(/^(01[016789]|02|0[3-9][0-9])(\d{3,4})(\d{4})$/);
    if (match) {
      const [, areaCode, firstPart, secondPart] = match;
      setError(null); // Clear error if the format is valid
      return `${areaCode}-${firstPart}-${secondPart}`;
    }

    // Set error if the format is invalid
    setError('유효하지 않은 전화번호');
    return num;
  },[]);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const formattedValue = parsingPhoneNumber(e.target.value);
      setInputValue(formattedValue);
      field.value = formattedValue;
    },
    [field]
  );

  return (
    <div>
    <input
      type="tel"
      maxLength={13}
      className="w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      value={inputValue}
      onChange={handleChange}
      placeholder="010(또는 지역번호)-1234-5678"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
  );
}
