'use client';

import Select from 'react-select';
import { Field } from './registration';
import { useEffect } from 'react';

interface Props {
  field: Field<string | null>;
  options: string[];
  setError: (error: string) => void;
}

export default function DropdownFieldInput({
  field,
  options,
  setError,
}: Props) {
  useEffect(() => {
    setError('값을 선택해 주세요');
  }, []);

  return (
    <Select
      instanceId={'select-' + field.name}
      placeholder="선택해주세요"
      options={options.map((option) => ({ label: option, value: option }))}
      onChange={(e) => {
        field.value = e?.value ?? null;
        if (field.value) {
          setError('');
        } else {
          setError('값을 선택해 주세요');
        }
      }}
    />
  );
}
