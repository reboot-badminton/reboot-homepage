'use client';

import { useCallback, useEffect, useState } from 'react';
import { LessonMonth } from '@/app/data/LessonMonth';
import MonthSelector from './MonthSelector';
import DaySelector from '../../components/DaySelector';
import TimeTable from './TimeTable';
import TimeSlot from '@/app/data/TimeSlot';
import { getSlotsForDay, getSlotsForMonth } from './getSlot';
import SlotDialog from './SlotDialog';
import AccessControl from '../AccessControl';
import { Role } from '@/firebase';

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
    <AccessControl allowedRoles={[Role.ADMIN, Role.MANAGER]}>
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <h1 className="text-lg">레슨 슬롯 관리</h1>
          <MonthSelector onLessonMonthChange={setLessonMonth} />
        </div>
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
    </AccessControl>
  );
}
