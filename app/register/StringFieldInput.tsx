'use client';

import { ChangeEvent, useCallback, useEffect } from 'react';
import { Field } from './registration';

interface Props {
  field: Field<string>;
  setError: (error: string) => void;
}

export default function StringFieldInput({ field, setError }: Props) {
  useEffect(() => {
    if (field.isRequired && field.value === '') {
      setError('값을 입력해 주세요');
    } else {
      setError('');
    }
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      field.value = value;
      if (field.isRequired && value === '') {
        setError('값을 입력해 주세요');
      } else {
        setError('');
      }
    },
    [field]
  );

  return <input className="w-full" onChange={onChange} />;
}
