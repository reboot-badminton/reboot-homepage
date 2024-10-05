'use client';

import Select from 'react-select';
import { Field } from './registration';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';

interface Props {
  field: Field<string | null>;
  options: string[];
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

function toSelectOptions(options: string[]) {
  return options.map((option) => ({ label: option, value: option }));
}

export default function DropdownFieldInput({
  field,
  options,
  setError,
  onUpdate,
}: Props) {
  const [selectOptions, setSelectOptions] = useState(toSelectOptions(options));
  const [fixedOptionIndex, setFixedOptionIndex] = useState<number | null>();
  const { userData } = useAuth();

  useEffect(() => {
    if (userData == null || field.fixedValue == null) return;

    const fixedValue = field.fixedValue(userData);
    if (fixedValue == null) return;

    setFixedOptionIndex(options.indexOf(fixedValue));
    console.log('fixed option ', options.indexOf(fixedValue));
  }, [userData, field, setFixedOptionIndex]);

  useEffect(() => {
    setError('값을 선택해 주세요');
  }, [setError]);

  useEffect(() => {
    setSelectOptions(toSelectOptions(options));
  }, [options]);

  return (
    <Select
      value={fixedOptionIndex != null ? selectOptions[fixedOptionIndex] : null}
      instanceId={'select-' + field.name}
      placeholder="선택해주세요"
      options={selectOptions}
      isDisabled={fixedOptionIndex != null}
      onChange={(e) => {
        field.value = e?.value ?? null;

        const isValid = !!field.value;
        if (isValid) {
          setError('');
        } else {
          setError('값을 선택해 주세요');
        }
        onUpdate(isValid);
      }}
    />
  );
}
