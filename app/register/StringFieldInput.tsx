'use client';

import { ChangeEvent, useCallback } from 'react';
import { Field } from './registration';

interface Props {
  field: Field<string>;
}

export default function StringFieldInput({ field }: Props) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      field.value = e.target.value;
    },
    [field]
  );

  return <input className="w-full" onChange={onChange} />;
}
