'use client';

import { Field, FieldType } from './registration';
import DateFieldInput from './DateFieldInput';
import PhoneNumberFieldInput from './PhoneNumberFieldInput';
import StringFieldInput from './StringFieldInput';
import DropdownFieldInput from './DropdownFieldInput';
import TimeSlotFieldInput from './TimeSlotFieldInput';
import TimeSlot from '../data/TimeSlot';
import { useState } from 'react';

interface Props<T> {
  field: Field<T>;
  showError: boolean;
}

export default function FieldInput<T>({ field, showError }: Props<T>) {
  const [error, setError] = useState<string>('');

  return (
    <div className="mb-3">
      <label className="block">
        {field.name} {field.isRequired ? '*' : ''}
      </label>
      {field.type === FieldType.TIME_SLOT && (
        <TimeSlotFieldInput
          field={field as Field<TimeSlot[]>}
          setError={setError}
        />
      )}
      {field.type === FieldType.STRING && (
        <StringFieldInput field={field as Field<string>} setError={setError} />
      )}
      {field.type === FieldType.OPTIONS && (
        <DropdownFieldInput
          field={field as Field<string | null>}
          options={field.data}
          setError={setError}
        />
      )}
      {field.type === FieldType.DATE && (
        <DateFieldInput field={field as Field<Date>} setError={setError} />
      )}
      {field.type === FieldType.PHONE && (
        <PhoneNumberFieldInput
          field={field as Field<string>}
          setError={setError}
        />
      )}
      {showError && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
