'use client';

import { useCallback, useEffect, useState } from 'react';
import { LessonMonth } from '@/app/data/LessonMonth';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeTable from './TimeTable';
import TimeSlot from '@/app/data/TimeSlot';
import { getSlotsForDay, getSlotsForMonth } from './getSlot';
import SlotDialog from './SlotDialog';

export default function ManageSlots() {
  const [day, setDay] = useState(0);
  const [lessonMonth, setLessonMonth] = useState<LessonMonth>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [clickedSlot, setClickedSlot] = useState<TimeSlot | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const refresh = useCallback(() => {
    if (!lessonMonth) return;
    getSlotsForMonth(lessonMonth).then((slots) => setSlots(slots));
  }, [lessonMonth]);

  useEffect(() => refresh(), [refresh]);

  return (
    <div className="p-4">
      <MonthSelector onLessonMonthChange={setLessonMonth} />
      <DaySelector onDayChange={setDay} />
      {lessonMonth && (
        <TimeTable
          slots={getSlotsForDay(slots, day)}
          onSlotClick={(slot) => {
            setIsAddMode(false);
            setClickedSlot(slot);
          }}
          onEmptySlotClick={(time) => {
            setIsAddMode(true);
            setClickedSlot({
              lessonMonth,
              days: [day],
              time,
              title: '',
              coach: '',
              price: 0,
              capacity: 2,
              students: [],
            });
          }}
        />
      )}
      {clickedSlot && (
        <SlotDialog
          slot={clickedSlot}
          isAddMode={isAddMode}
          onClose={(isEdited) => {
            if (isEdited) {
              refresh();
            }
            setClickedSlot(null);
          }}
        />
      )}
    </div>
  );
}
