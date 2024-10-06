'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Field } from './registration';

interface Props {
  field: Field<string>;
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

export default function StringFieldInput({ field, setError, onUpdate }: Props) {
  const [value, setValue] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const { userData } = useAuth();

  useEffect(() => {
    if (userData == null || field.fixedValue == null) return;

    const fixedValue = field.fixedValue(userData);
    if (fixedValue != null) {
      setValue(fixedValue);
      setIsFixed(true);
      onUpdate(true);
    }
  }, [userData, field, setValue]);

  useEffect(() => {
    if (field.isRequired && value === '') {
      setError('값을 입력해 주세요');
    } else {
      setError('');
    }
  }, [field, value, setError]);

  useEffect(() => {
    field.value = value;
  }, [field, value]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(value);

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

  return <input className="w-full" onChange={onChange} disabled={isFixed} value={value} />;
}
