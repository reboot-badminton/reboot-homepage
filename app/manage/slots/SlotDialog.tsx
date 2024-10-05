'use client';

import TimeSlot from '@/app/data/TimeSlot';
import { useCallback, useRef, useState } from 'react';
import { deleteSlot, updateSlot } from './getSlot';
import SlotDialogField from './SlotDialogField';
import SlotDialogDaysField from './SlotDialotDaysField';

interface Props {
  slot: TimeSlot;
  isAddMode: boolean;
  onClose: (isEdited: boolean) => void;
}

export default function SlotDialog({ slot, isAddMode, onClose }: Props) {
  const [isEditMode, setIsEditMode] = useState(isAddMode);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const isEditedRef = useRef(false);

  const titleRef = useRef(slot.title);
  const daysRef = useRef<number[]>(slot.days);
  const coachRef = useRef(slot.coach);
  const priceRef = useRef(slot.price);
  const capacityRef = useRef(slot.capacity);

  const initialize = useCallback(() => {
    titleRef.current = slot.title;
    daysRef.current = slot.days;
    coachRef.current = slot.coach;
    priceRef.current = slot.price;
    capacityRef.current = slot.capacity;
  }, [slot]);

  return (
    <div className="w-64 text-sm mx-4 mt-4 mb-2">
      <SlotDialogField
        title=""
        valueRef={titleRef}
        isEditMode={isEditMode}
        className="text-base mb-2"
      />
      <SlotDialogDaysField daysRef={daysRef} isEditMode={isEditMode} />
      <SlotDialogField
        title="코치"
        valueRef={coachRef}
        isEditMode={isEditMode}
      />
      <SlotDialogField
        title="가격"
        valueRef={priceRef}
        suffix="원"
        isEditMode={isEditMode}
      />
      <SlotDialogField
        title="정원"
        valueRef={capacityRef}
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
            <div
              className="p-2 font-bold text-gray-500"
              onClick={() => {
                setIsEditLoading(true);
                deleteSlot(slot).then(() => {
                  setIsEditLoading(false);
                  onClose(true);
                });
              }}
            >
              삭제
            </div>
            <div
              className="p-2 font-bold text-gray-500"
              onClick={() => setIsEditMode(true)}
            >
              수정
            </div>
            <div
              className="p-2 font-bold text-gray-500"
              onClick={() => onClose(isEditedRef.current)}
            >
              닫기
            </div>
          </>
        )}
        {isEditMode && (
          <>
            <div
              className="p-2 font-bold text-gray-500"
              onClick={() => {
                if (isAddMode) {
                  onClose(false);
                } else {
                  initialize();
                  setIsEditMode(false);
                }
              }}
            >
              취소
            </div>
            <div
              className="p-2 font-bold text-gray-500"
              onClick={() => {
                setIsEditLoading(true);
                updateSlot(
                  {
                    ...slot,
                    title: titleRef.current,
                    days: daysRef.current,
                    coach: coachRef.current,
                    price: priceRef.current,
                    capacity: capacityRef.current,
                  },
                  slot
                ).then(() => {
                  onClose(true);
                });
              }}
            >
              완료
            </div>
          </>
        )}
      </div>
    </div>
  );
}
