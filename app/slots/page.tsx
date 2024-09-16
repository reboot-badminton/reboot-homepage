'use client';

import { useCallback, useEffect, useState } from 'react';
import MonthSelector from '../manage/slots/MonthSelector';
import DaySelector from '../components/DaySelector';
import { LessonMonth } from '../data/LessonMonth';
import TimeTable from '../manage/slots/TimeTable';
import { getSlotsForDay, getSlotsForMonth } from '../manage/slots/getSlot';
import TimeSlot from '../data/TimeSlot';
import SlotsDialog from './SlotsDialog';

function SlotPage() {
  const [lessonMonth, setLessonMonth] = useState<LessonMonth>();
  const [day, setDay] = useState(0);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [clickedSlot, setClickedSlot] = useState<TimeSlot | null>(null);

  const refresh = useCallback(() => {
    if (!lessonMonth) return;
    getSlotsForMonth(lessonMonth).then((slots) => setSlots(slots));
  }, [lessonMonth]);

  useEffect(() => refresh(), [refresh]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h1 className="text-lg">레슨 슬롯</h1>
        <MonthSelector onLessonMonthChange={setLessonMonth} />
      </div>
      <DaySelector onDayChange={setDay} />
      {lessonMonth && (
        <TimeTable
          slots={getSlotsForDay(slots, day)}
          onSlotClick={(slot) => {
            setClickedSlot(slot);
          }}
          onEmptySlotClick={() => {}}
          isAdmin={false}
        />
      )}
      {clickedSlot && (
        <SlotsDialog
          slot={clickedSlot}
          onClose={() => {
            setClickedSlot(null);
          }}
        />
      )}
    </div>
  );
}

export default SlotPage;
