'use client';

import { useCallback, useEffect, useState } from 'react';
import { Field } from './registration';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  field: Field<Date>;
  setError: (error: string) => void;
}

export default function DateFieldInput({ field, setError }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(field.value);

  const updateError = useCallback(() => {
    if (field.value.getFullYear() > new Date().getFullYear() - 8) {
      setError('9세 이상 신청 가능합니다');
    } else {
      setError('');
    }
  }, [field.value, setError]);

  useEffect(() => {
    updateError();
  }, []);

  const handleChange = useCallback(
    (date: Date | null) => {
      if (date == null) return;
      setSelectedDate(date);
      field.value = date;
      updateError();
    },
    [field]
  );

  return (
    <>
      <style jsx global>{`
        .react-datepicker__input-container .react-datepicker__calendar-icon {
          padding: 10px;
          fill: grey;
        }
      `}</style>
      <DatePicker
        className="!p-1.5 !pl-8"
        showIcon
        toggleCalendarOnIconClick
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        selected={selectedDate}
        onChange={handleChange}
        maxDate={new Date()}
      />
    </>
  );
}
