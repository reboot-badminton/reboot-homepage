'use client';

import { LessonMonth } from '@/app/data/LessonMonth';
import TimeSlot from '@/app/data/TimeSlot';
import { useDialog } from '@/app/providers/DialogProvider';
import DaySelector from '@/components/DaySelector';
import { useCallback, useEffect, useState } from 'react';
import { getSlotsForDay, getSlotsForMonth } from './getSlot';
import MonthSelector from './MonthSelector';
import SlotDialog from './SlotDialog';
import TimeTable from './TimeTable';

export default function ManageSlots() {
  const [day, setDay] = useState(0);
  const [lessonMonth, setLessonMonth] = useState<LessonMonth>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const { showDialog, closeDialog } = useDialog();

  const refresh = useCallback(() => {
    if (!lessonMonth) return;
    getSlotsForMonth(lessonMonth).then((slots) => setSlots(slots));
  }, [lessonMonth]);

  const showSlotDialog = useCallback((slot: TimeSlot, isAddMode: boolean) => {
    showDialog({
      title: '레슨 슬롯',
      body: (
        <SlotDialog
          slot={slot}
          isAddMode={isAddMode}
          onClose={(isEdited) => {
            if (isEdited) {
              refresh();
            }
            closeDialog();
          }}
        />
      ),
    });
  }, [refresh]);

  const onSlotClick = useCallback((slot: TimeSlot) => {
    showSlotDialog(slot, false);
  }, [showSlotDialog]);

  const onEmptySlotClick = useCallback((time: number) => {
    if (lessonMonth == null) return;

    showSlotDialog({
      lessonMonth,
      days: [day],
      time,
      title: '',
      coach: '',
      price: 0,
      capacity: 2,
      students: [],
      duration: 1,
    }, true);
  }, [lessonMonth, day, showSlotDialog]);

  useEffect(() => refresh(), [refresh]);

  return (
    <div className="p-4">
      <MonthSelector onLessonMonthChange={setLessonMonth} />
      <DaySelector onDayChange={setDay} />
      {lessonMonth && (
        <TimeTable
          slots={getSlotsForDay(slots, day)}
          onSlotClick={onSlotClick}
          onEmptySlotClick={onEmptySlotClick}
        />
      )}
    </div>
  );
}
