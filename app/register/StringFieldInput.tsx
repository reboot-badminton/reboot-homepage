'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Field } from './registration';
import { useAuth } from '../components/AuthProvider';

interface Props {
  field: Field<string>;
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

export default function StringFieldInput({ field, setError, onUpdate }: Props) {
  const [fixedValue, setFixedValue] = useState<string | null>();
  const {userData} = useAuth();

  useEffect(() => {
    if (userData == null || field.fixedValue == null) return;
    setFixedValue(field.fixedValue(userData));
  }, [userData, field, setFixedValue]);

  useEffect(() => {
    if (field.isRequired && field.value === '') {
      setError('값을 입력해 주세요');
    } else {
      setError('');
    }
  }, [field, setError]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      field.value = value;

      const isValid = !field.isRequired || value !== '';
      if (isValid) {
        setError('값을 입력해 주세요');
      } else {
        setError('');
      }
      onUpdate(isValid);
    },
    [field, setError, onUpdate]
  );

  return <input className="w-full" onChange={onChange} disabled={fixedValue != null} value={fixedValue ?? ''} />;
}
