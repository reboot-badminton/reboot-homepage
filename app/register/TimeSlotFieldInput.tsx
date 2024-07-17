'use client';

import { Field } from './registration';
import TimeSlot from '../data/TimeSlot';
import TimeSlotSelectDialog from './TimeSlotSelectDialog';
import { useEffect, useState } from 'react';
import { formatHour } from '../time_utils';

interface Props {
  field: Field<TimeSlot[]>;
  setError: (error: string) => void;
}

export default function TimeSlotFieldInput({ field, setError }: Props) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(field.value);

  useEffect(() => {
    field.value = selectedTimeSlots;
    if (selectedTimeSlots.length === 0) {
      setError('레슨을 선택해주세요');
    } else {
      setError('');
    }
  }, [selectedTimeSlots]);

  return (
    <div className="ml-2">
      {selectedTimeSlots.length === 0 && (
        <div className="my-1 text-sm">선택된 레슨이 없습니다.</div>
      )}
      {selectedTimeSlots.length > 0 &&
        selectedTimeSlots.map((slot) => (
          <div className="mb-2" key={'selected-slot-' + slot.title}>
            <div className="block text-sm">{slot.title}</div>
            <span className="block text-xs ml-2">
              {slot.days.map((d) => '월화수목금토일'[d]).join(', ')}{' '}
              {formatHour(slot.time)}
            </span>
          </div>
        ))}
      <button className="sm" onClick={() => setIsSelecting(true)}>
        관심 레슨 선택하기
      </button>
      {isSelecting && (
        <TimeSlotSelectDialog
          selected={selectedTimeSlots}
          onConfirm={(selected) => {
            setSelectedTimeSlots(selected);
            setIsSelecting(false);
          }}
          onCancel={() => {
            setIsSelecting(false);
          }}
        />
      )}
    </div>
  );
}