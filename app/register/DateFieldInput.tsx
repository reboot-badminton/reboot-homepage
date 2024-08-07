'use client';

import { useCallback, useEffect, useState } from 'react';
import { Field } from './registration';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  field: Field<Date>;
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

export default function DateFieldInput({ field, setError, onUpdate }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(field.value);

  const onDateChange = useCallback(() => {
    const isValid = field.value.getFullYear() <= new Date().getFullYear() - 8;
    if (!isValid) {
      setError('9세 이상 신청 가능합니다');
    } else {
      setError('');
    }

    onUpdate(isValid);
  }, [field.value, setError, onUpdate]);

  useEffect(() => {
    onDateChange();
  }, [onDateChange]);

  const handleChange = useCallback(
    (date: Date | null) => {
      if (date == null) return;
      setSelectedDate(date);
      field.value = date;
      onDateChange();
    },
    [field, onDateChange]
  );

  // noinspection CssUnusedSymbol CSS classes are used in DatePicker
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
