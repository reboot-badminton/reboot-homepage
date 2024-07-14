import TimeSlot from '@/app/data/TimeSlot';

interface Props {
  slot: TimeSlot | undefined;
}

export default function Slot({ slot }: Props) {
  if (slot == null) {
    return (
      <div className="text-xs h-10 flex justify-center items-center">-</div>
    );
  }

  return (
    <div className="text-sm px-2 py-1">
      <b className="block mb-1">{slot.title}</b>
      <span>{slot.coach}</span>
      <span className="ml-1 text-gray-500">₩{slot.price}</span>
      <span className="block text-xs">
        ({slot.students.length} / {slot.capacity}) {slot.students.join(', ')}
      </span>
    </div>
  );
}
