'use client';

import { MutableRefObject, useCallback, useEffect, useState } from 'react';

interface Props {
  title?: string;
  valueRef: MutableRefObject<string | number>;
  suffix?: string;
  isEditMode: boolean;
  className?: string;
}

export default function SlotDialogField({
  title,
  valueRef,
  suffix,
  isEditMode,
  className = '',
}: Props) {
  const [value, setValue] = useState(valueRef.current);

  useEffect(() => {
    setValue(valueRef.current);
  }, [isEditMode]);

  const parse = useCallback(
    (value: string) => {
      if (typeof valueRef.current === 'number') {
        return Number(value);
      }
      return value;
    },
    [typeof valueRef.current]
  );

  return (
    <div className="flex whitespace-nowrap">
      {title && <b className="mr-2">{title}</b>}
      {!isEditMode && (
        <span className={"flex-grow border-b border-transparent " + className}>
          {typeof valueRef.current === 'number'
            ? valueRef.current.toLocaleString()
            : valueRef.current}
          {suffix && <>{suffix}</>}
        </span>
      )}
      {isEditMode && (
        <>
          <input
            className={"flex-grow border-b mr-4 ml-1 " + className}
            size={10}
            value={value}
            inputMode={
              typeof valueRef.current === 'number' ? 'decimal' : 'text'
            }
            onChange={(e) => {
              const value = parse(e.target.value);
              if (typeof valueRef.current !== 'number' || !isNaN(value as number)) {
                valueRef.current = value;
                setValue(e.target.value);
              }
            }
            }
          />
          {suffix && <>{suffix}</>}
        </>
      )}
    </div>
  );
}
