'use client';

import { CancelDialogButton, ConfirmDialogButton } from '@/components/DialogButtons';
import { useCallback, useEffect, useState } from 'react';
import DaySelector from '../../components/DaySelector';
import { currentLessonMonth } from '../data/LessonMonth';
import TimeSlot, { isSameSlot } from '../data/TimeSlot';
import { getRegistrations } from '../manage/registrations/getRegistration';
import { getSlotsForDay, getSlotsForMonth } from '../manage/slots/getSlot';
import TimeSlotItem from './TimeSlotItem';

interface Props {
  selected: TimeSlot[];
  onConfirm: (slots: TimeSlot[]) => void;
  onCancel: () => void;
}

export default function TimeSlotSelectDialog({
  selected,
  onConfirm,
  onCancel,
}: Props) {
  const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>([]);
  const [visibleTimeSlots, setVisibleTimeSlots] = useState<TimeSlot[]>([]);
  const [day, setDay] = useState(0);

  const [registeredTimeSlots, setRegisteredTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] =
    useState<TimeSlot[]>(selected);

  const isSelectedTimeSlot = useCallback((timeSlot: TimeSlot) => {
    for (const slot of selectedTimeSlots) {
      if (isSameSlot(timeSlot, slot)) return true;
    }
    return false;
  }, [selectedTimeSlots]);

  const isRegisteredTimeSlot = useCallback((timeSlot: TimeSlot) => {
    for (const slot of registeredTimeSlots) {
      if (isSameSlot(timeSlot, slot)) return true;
    }
    return false;
  }, [registeredTimeSlots]);

  useEffect(() => {
    Promise
      .all([getSlotsForMonth(currentLessonMonth()), getRegistrations()])
      .then(([timeSlots, registrations]) => {
        setAllTimeSlots(timeSlots);
        setRegisteredTimeSlots(registrations.flatMap(r => r.times));
      });
  }, [setAllTimeSlots, setRegisteredTimeSlots]);

  useEffect(() => {
    setSelectedTimeSlots(selected);
  }, [selected]);

  useEffect(() => {
    setVisibleTimeSlots(
      getSlotsForDay(allTimeSlots, day).filter(
        (slot) => slot.capacity > slot.students.length
      )
    );
  }, [allTimeSlots, day]);

  return (
    <>
      <DaySelector onDayChange={setDay} />
      <div className="py-1">
        {visibleTimeSlots.map((timeSlot) => (
          <TimeSlotItem
            key={'slot-' + timeSlot.time}
            timeSlot={timeSlot}
            isRegistered={isRegisteredTimeSlot(timeSlot)}
            isSelected={isSelectedTimeSlot(timeSlot)}
            onSelectChanged={(isSelected) => {
              if (isSelected) {
                setSelectedTimeSlots((selected) => [timeSlot, ...selected]);
              } else {
                setSelectedTimeSlots((selected) => selected.filter((slot) => !isSameSlot(slot, timeSlot)));
              }
            }} />
        ))}
      </div>
      <div className="flex justify-end">
        <CancelDialogButton onClick={onCancel} />
        <ConfirmDialogButton onClick={() => onConfirm(selectedTimeSlots)} />
      </div>
    </>
  );
}
