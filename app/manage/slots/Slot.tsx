import { useAuth } from '@/app/components/AuthProvider';
import TimeSlot from '@/app/data/TimeSlot';
import { Role } from '@/firebase';

interface Props {
  slot: TimeSlot | undefined;
  onClick: (slot: TimeSlot | null) => void;
}

export default function Slot({ slot, onClick }: Props) {
  const { role } = useAuth();

  if (slot == null) {
    return (
      <div
        className="text-xs h-10 flex justify-center items-center"
        onClick={() => onClick(null)}
      >
        -
      </div>
    );
  }

  return (
    <div className="text-sm px-2 py-1" onClick={() => onClick(slot)}>
      <b className="block mb-1">{slot.title}</b>
      {(role == Role.ADMIN || role == Role.MANAGER) && (
        <>
          <span>{slot.coach}</span>
          <span className="ml-1 text-gray-500">
            ₩{slot.price.toLocaleString()}
          </span>
        </>
      )}
      <span className="block text-xs">
        ({slot.students.length} / {slot.capacity}) {slot.students.join(', ')}
      </span>
    </div>
  );
}
