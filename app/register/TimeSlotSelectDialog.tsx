'use client';

import { useEffect, useState } from 'react';
import DaySelector from '../components/DaySelector';
import Dialog from '../components/Dialog';
import TimeSlot, { isSameSlot } from '../data/TimeSlot';
import { getSlotsForDay, getSlotsForMonth } from '../manage/slots/getSlot';
import { currentLessonMonth } from '../data/LessonMonth';
import { formatHour } from '../time_utils';
import { FaRegCircleCheck } from 'react-icons/fa6';
import {
  CancelDialogButton,
  ConfirmDialogButton,
} from '../components/DialogButtons';

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

  const [selectedTimeSlots, setSelectedTimeSlots] =
    useState<TimeSlot[]>(selected);

  useEffect(() => {
    getSlotsForMonth(currentLessonMonth()).then(setAllTimeSlots);
  }, []);

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
    <Dialog>
      <div className="p-2">
        <h1 className="block">희망하는 시간대를 선택해 주세요.</h1>
        <DaySelector onDayChange={setDay} />
        <div className="py-1">
          {visibleTimeSlots.map((slot) => (
            <div
              className="mx-1 my-1 py-1 border-b flex items-center"
              key={'slot-' + slot.time}
            >
              <div className="flex-grow">
                <h2 className="font-bold text-md">{slot.title}</h2>
                <span className="block text-sm">
                  {slot.days.map((d) => '월화수목금토일'[d]).join(', ')}{' '}
                  {formatHour(slot.time)}
                </span>
                <span className="block text-sm">
                  잔여: {slot.capacity - slot.students.length}
                </span>
              </div>
              <FaRegCircleCheck
                color={
                  selectedTimeSlots.findIndex((selected) =>
                    isSameSlot(selected, slot)
                  ) !== -1
                    ? 'rgb(96 165 250)'
                    : 'darkgrey'
                }
                className="mr-2 p-2 cursor-pointer"
                size={34}
                onClick={() => {
                  const index = selectedTimeSlots.findIndex((selected) =>
                    isSameSlot(selected, slot)
                  );
                  if (index === -1) {
                    setSelectedTimeSlots((selected) => [slot, ...selected]);
                  } else {
                    setSelectedTimeSlots((selected) =>
                      selected.filter((_, i) => i !== index)
                    );
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <CancelDialogButton onClick={onCancel} />
          <ConfirmDialogButton onClick={() => onConfirm(selectedTimeSlots)} />
        </div>
      </div>
    </Dialog>
  );
}
