'use client';

import { useEffect, useState } from 'react';
import { LessonMonth } from '@/app/data/LessonMonth';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeTable from './TimeTable';
import TimeSlot from '@/app/data/TimeSlot';
import { getSlotsForDay, getSlotsForMonth } from './getSlot';

export default function ManageSlots() {
  const [day, setDay] = useState(0);
  const [lessonMonth, setLessonMonth] = useState<LessonMonth>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (!lessonMonth) return;
    getSlotsForMonth(lessonMonth).then((slots) => setSlots(slots));
  }, [lessonMonth]);

  return (
    <div className="p-4">
      <MonthSelector onLessonMonthChange={setLessonMonth} />
      <DaySelector onDayChange={setDay} />
      {lessonMonth && <TimeTable slots={getSlotsForDay(slots, day)} />}
    </div>
  );
}
