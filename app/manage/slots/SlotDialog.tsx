import Dialog from '@/app/components/Dialog';
import TimeSlot from '@/app/data/TimeSlot';
import SlotDialogField from './SlotDialogField';

interface Props {
  slot: TimeSlot;
  onClose: (isEdited: boolean) => void;
}

export default function SlotDialog({ slot, onClose }: Props) {
  return (
    <Dialog>
      <div className="w-48 text-sm mx-4 mt-4 mb-2">
        <h1 className="text-base mb-2">{slot.title}</h1>
        <SlotDialogField title="코치" initialValue={slot.coach} />
        <SlotDialogField title="가격" initialValue={slot.price} suffix="원" />
        <SlotDialogField
          title="정원"
          initialValue={slot.capacity}
          suffix="명"
        />
        <div className="mt-2">
          <span className="block">
            <b>현재 레슨생</b> ({slot.students.length}명)
          </span>
          <span>{slot.students.join(', ')}</span>
        </div>
        <div className="text-right">
          <button className="p-2 font-bold text-gray-500">수정</button>
          <button
            className="p-2 font-bold text-gray-500"
            onClick={() => onClose(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </Dialog>
  );
}
