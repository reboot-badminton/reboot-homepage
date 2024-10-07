'use client';

import { MutableRefObject, useEffect, useState } from 'react';

interface Props {
  daysRef: MutableRefObject<number[]>;
  isEditMode: boolean;
}

export default function SlotDialogDaysField({ daysRef, isEditMode }: Props) {
  const [days, setDays] = useState<number[]>(daysRef.current);

  useEffect(() => {
    setDays(daysRef.current);
  }, [isEditMode]);

  useEffect(() => {
    daysRef.current = days;
  }, [days]);

  return (
    <div className={'w-full flex' + (isEditMode ? ' justify-between' : '')}>
      {'월화수목금토일'
        .split('')
        .map((day, index) => {
          return (
            <div
              className={
                'block w-7 h-7 m-1 border rounded-full flex justify-center items-center' +
                (days.includes(index) ? ' bg-blue-100 text-gray-700' : '') +
                (isEditMode ? ' cursor-pointer hoverable:hover::bg-slate-100 active:bg-slate-100' : '')
              }
              onClick={() => {
                if (!isEditMode) return;
                setDays((days) => {
                  const daysIndex = days.indexOf(index);
                  if (daysIndex === -1) {
                    return [...days, index];
                  } else {
                    return days.filter((_, index) => index !== daysIndex);
                  }
                });
              }}
              key={'day-' + index}
            >
              {day}
            </div>
          );
        })
        .filter((_, index) => isEditMode || days.includes(index))}
    </div>
  );
}
