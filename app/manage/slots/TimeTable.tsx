import TimeSlot from '@/app/data/TimeSlot';
import { Fragment, MouseEvent, useCallback } from 'react';
import Slot from './Slot';

interface Props {
  slots: TimeSlot[];
  onSlotClick: (slot: TimeSlot) => void;
  onEmptySlotClick: (time: number) => void;
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
}: Props) {
  const onRowClick = useCallback((e: MouseEvent, time: number) => {
    e.preventDefault();
    e.stopPropagation();

    const { top, height } = e.currentTarget.getBoundingClientRect();
    const isOverHalf = (e.clientY - top) / height >= 0.5;

    onEmptySlotClick(time + (isOverHalf ? 0.5 : 0));
  }, [onEmptySlotClick]);

  return (
    <table className="w-full bg-white">
      <tbody>
        {hours.map((label, time) => {
          const timeSlots = slots.filter((slot) => {
            return slot.time >= time && slot.time < time + 1;
          });
          const count = timeSlots.length;
          const width = Math.floor(95 / count);

          return (
            <Fragment key={label}>
              <tr>
                <td className="px-2 py-1 w-16 whitespace-nowrap text-xs">
                  {label}
                </td>
                <td><hr /></td>
              </tr>
              <tr className="h-[50px] -my-4" onClick={(e) => onRowClick(e, time)}>
                <td className="w-16" />
                <td className="relative">
                  {timeSlots.map((timeSlot, i) => (
                    <div
                      key={i.toString()}
                      className="absolute -top-3 -bottom-3 z-10"
                      style={{
                        left: i * width + '%',
                        width: width + '%',
                      }}>
                      <Slot
                        key={i.toString()}
                        slot={timeSlot}
                        onClick={(slot) => onSlotClick(slot)}
                      />
                    </div>
                  ))}
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
