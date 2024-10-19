import TimeSlot from '@/app/data/TimeSlot';
import { MouseEvent, useCallback } from 'react';

interface Props {
  slot: TimeSlot;
  onClick: (slot: TimeSlot) => void;
}

export default function Slot({ slot, onClick }: Props) {
  const onSlotClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(slot);
  }, [slot, onClick]);

  return (
    <div
      className="text-sm px-2 py-1 w-full cursor-pointer bg-blue-300 rounded-lg border"
      style={{
        height: (slot.duration ?? 1) * 100 + '%',
        transform: `translateY(${(slot.time - Math.floor(slot.time)) * 100}%)`
      }}
      onClick={onSlotClick}>
      <b className="block mb-1">{slot.title}</b>
      <span>{slot.coach}</span>
      <span className="ml-1 text-gray-500">₩{slot.price.toLocaleString()}</span>
      <span className="block text-xs">
        ({slot.students.length} / {slot.capacity}) {slot.students.join(', ')}
      </span>
    </div>
  );
}
