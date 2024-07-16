'use client';

import { useCallback, useState } from 'react';
import { Field } from './registration';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  field: Field<Date>;
}

export default function DateFieldInput({ field }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(field.value);

  const handleChange = useCallback(
    (date: Date | null) => {
      if (date == null) return;
      setSelectedDate(date);
      field.value = date;
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
        className="border-[hsl(0,0%,80%)] border rounded-[4px] !p-1.5 !pl-8"
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
