'use client';

import { useEffect, useState } from 'react';
import Select, { PropsValue } from 'react-select';
import { useAuth } from '../components/AuthProvider';
import { Field } from './registration';

interface Props {
  field: Field<string | null>;
  options: string[];
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

interface Option {
  label: string;
  value: string;
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
  const [value, setValue] = useState<PropsValue<Option> | null>(fixedOptionIndex != null ? selectOptions[fixedOptionIndex] : null);
  const { userData } = useAuth();

  useEffect(() => {
    if (userData == null || field.fixedValue == null) return;

    const fixedValue = field.fixedValue(userData);
    if (fixedValue == null) return;

    setFixedOptionIndex(options.indexOf(fixedValue));
  }, [userData, field, setFixedOptionIndex]);

  useEffect(() => {
    setError('값을 선택해 주세요');
  }, [setError]);

  useEffect(() => {
    setSelectOptions(toSelectOptions(options));
  }, [options]);

  return (
    <Select
      value={value}
      instanceId={'select-' + field.name}
      placeholder="선택해주세요"
      options={selectOptions}
      isDisabled={fixedOptionIndex != null}
      onChange={(e) => {
        setValue(e);

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
