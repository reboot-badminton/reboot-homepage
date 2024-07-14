import Slot from './Slot';
import TimeSlot from '@/app/data/TimeSlot';

interface Props {
  slots: TimeSlot[];
}

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 == 0 ? '12' : i % 12;
  const ampm = i >= 12 ? '오후' : '오전';
  return `${ampm} ${hour}시`;
});

export default function TimeTable({ slots }: Props) {
  return (
    <table className="w-full bg-white">
      <tbody>
        {hours.map((hour, i) => (
          <tr key={hour} className={'border' + (i === 12 ? ' border-t-8' : '')}>
            <td className="border px-2 py-1 w-16 whitespace-nowrap text-xs">
              {hour}
            </td>
            <td>
              <Slot slot={slots.find((slot) => slot.time === i)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
