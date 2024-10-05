'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDialog } from '../components/DialogProvider';
import TimeSlot from '../data/TimeSlot';
import { formatHour } from '../time_utils';
import { Field } from './registration';
import TimeSlotSelectDialog from './TimeSlotSelectDialog';

interface Props {
  field: Field<TimeSlot[]>;
  setError: (error: string) => void;
  onUpdate: (isValid: boolean) => void;
}

export default function TimeSlotFieldInput({ field, setError, onUpdate }: Props) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(field.value);

  const { showDialog, closeDialog } = useDialog();

  const startSelecting = useCallback(() => {
    showDialog({
      body: (
        <TimeSlotSelectDialog
          selected={selectedTimeSlots}
          onConfirm={(selected) => {
            setSelectedTimeSlots(selected);
            onUpdate(selected.length > 0);
            closeDialog();
          }}
          onCancel={() => {
            closeDialog();
          }}
        />
      ),
    });
  }, [showDialog]);

  useEffect(() => {
    field.value = selectedTimeSlots;
    if (selectedTimeSlots.length === 0) {
      setError('레슨을 선택해주세요');
    } else {
      setError('');
    }
  }, [field, selectedTimeSlots, setError]);

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
      <button className="sm" onClick={startSelecting}>
        관심 레슨 선택하기
      </button>
    </div>
  );
}
