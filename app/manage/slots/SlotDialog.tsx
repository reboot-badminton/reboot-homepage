'use client';

import Dialog from '@/app/components/Dialog';
import TimeSlot from '@/app/data/TimeSlot';
import SlotDialogField from './SlotDialogField';
import { useState } from 'react';

interface Props {
  slot: TimeSlot;
  onClose: (isEdited: boolean) => void;
}

export default function SlotDialog({ slot, onClose }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Dialog>
      <div className="w-48 text-sm mx-4 mt-4 mb-2">
        <h1 className="text-base mb-2">{slot.title}</h1>
        <SlotDialogField
          title="코치"
          initialValue={slot.coach}
          isEditMode={isEditMode}
        />
        <SlotDialogField
          title="가격"
          initialValue={slot.price}
          suffix="원"
          isEditMode={isEditMode}
        />
        <SlotDialogField
          title="정원"
          initialValue={slot.capacity}
          suffix="명"
          isEditMode={isEditMode}
        />
        <div className="mt-2">
          <span className="block">
            <b>현재 레슨생</b> ({slot.students.length}명)
          </span>
          <span>{slot.students.join(', ')}</span>
        </div>
        <div className="text-right">
          {!isEditMode && (
            <>
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => setIsEditMode(true)}
              >
                수정
              </button>
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => onClose(false)}
              >
                닫기
              </button>
            </>
          )}
          {isEditMode && (
            <>
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => setIsEditMode(false)}
              >
                취소
              </button>
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => onClose(false)}
              >
                완료
              </button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
