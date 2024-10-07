import { FaRegCircleCheck } from 'react-icons/fa6';
import TimeSlot from '../data/TimeSlot';
import { formatHour } from '../../utils/time_utils';

interface Props {
  timeSlot: TimeSlot;
  isRegistered: boolean;
  isSelected: boolean;
  onSelectChanged: (isSelected: boolean) => void;
}

export default function TimeSlotItem({ timeSlot, isRegistered, isSelected, onSelectChanged }: Props) {
  return (
    <div className="mx-1 my-1 py-1 border-b flex items-center">
      <div className="flex-grow">
        <h2 className="font-bold text-md">{timeSlot.title}</h2>
        <span className="block text-sm">
          {timeSlot.days.map((d) => '월화수목금토일'[d]).join(', ')}{' '}
          {formatHour(timeSlot.time)}
        </span>
        <span className="block text-sm">
          잔여: {timeSlot.capacity - timeSlot.students.length}
        </span>
      </div>
      {isRegistered && (
        <div className="text-xs bg-green-500 text-white p-1 rounded-md">신청 완료</div>
      )}
      {!isRegistered && (
        <FaRegCircleCheck
          color={isSelected ? 'rgb(96 165 250)' : 'darkgrey'}
          className="mr-2 p-2 cursor-pointer"
          size={34}
          onClick={() => onSelectChanged(!isSelected)}
        />
      )}
    </div>
  );
}