'use client';

import { useCallback, useState } from 'react';
import { Field } from './registration';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  field: Field<Date>;
}

export default function DateFieldInput({ field }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(field.value);

  const handleChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
      if (date) {
        field.value = date;
      }
    },
    [field]
  );

  return (
    <div className="relative">
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        selected={selectedDate}
        onChange={handleChange}
        maxDate={new Date()}
      />
    </div>
  );
}
