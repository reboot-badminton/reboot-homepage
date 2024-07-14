'use client';

import { useCallback, useEffect, useState } from 'react';
import { LessonMonth } from '@/app/data/LessonMonth';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeTable from './TimeTable';
import TimeSlot from '@/app/data/TimeSlot';
import { getSlotsForDay, getSlotsForMonth } from './getSlot';
import Dialog from '@/app/components/Dialog';
import SlotDialog from './SlotDialog';

export default function ManageSlots() {
  const [day, setDay] = useState(0);
  const [lessonMonth, setLessonMonth] = useState<LessonMonth>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [clickedSlot, setClickedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    if (!lessonMonth) return;
    getSlotsForMonth(lessonMonth).then((slots) => setSlots(slots));
  }, [lessonMonth]);

  return (
    <div className="p-4">
      <MonthSelector onLessonMonthChange={setLessonMonth} />
      <DaySelector onDayChange={setDay} />
      {lessonMonth && (
        <TimeTable
          slots={getSlotsForDay(slots, day)}
          onSlotClick={setClickedSlot}
        />
      )}
      {clickedSlot && (
        <SlotDialog slot={clickedSlot} onClose={() => setClickedSlot(null)} />
      )}
    </div>
  );
}
