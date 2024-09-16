import Slot from './Slot';
import TimeSlot from '@/app/data/TimeSlot';

interface Props {
  slots: TimeSlot[];
  onSlotClick: (slot: TimeSlot) => void;
  onEmptySlotClick: (time: number) => void;
  isAdmin: boolean;
}

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 == 0 ? '12' : i % 12;
  const ampm = i >= 12 ? '오후' : '오전';
  return `${ampm} ${hour}시`;
});

export default function TimeTable({
  slots,
  onSlotClick,
  onEmptySlotClick,
  isAdmin,
}: Props) {
  return (
    <table className="w-full bg-white">
      <tbody>
        {hours.map((hour, time) => (
          <tr
            key={hour}
            className={'border' + (time === 12 ? ' border-t-8' : '')}
          >
            <td className="border px-2 py-1 w-16 whitespace-nowrap text-xs">
              {hour}
            </td>
            <td>
              <Slot
                slot={slots.find((slot) => slot.time === time)}
                onClick={(slot) => {
                  if (slot) {
                    onSlotClick(slot);
                  } else {
                    onEmptySlotClick(time);
                  }
                }}
                isAdmin={isAdmin}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
