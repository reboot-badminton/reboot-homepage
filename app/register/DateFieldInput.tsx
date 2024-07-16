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
    <DatePicker
      showIcon
      toggleCalendarOnIconClick
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      selected={selectedDate}
      onChange={handleChange}
      maxDate={new Date()}
    />
  );
}
