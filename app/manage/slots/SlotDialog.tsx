'use client';

import Dialog from '@/app/components/Dialog';
import TimeSlot from '@/app/data/TimeSlot';
import SlotDialogField from './SlotDialogField';
import { useCallback, useRef, useState } from 'react';
import { updateSlot } from './getSlot';

interface Props {
  slot: TimeSlot;
  onClose: (isEdited: boolean) => void;
}

export default function SlotDialog({ slot, onClose }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const isEditedRef = useRef(false);

  const titleRef = useRef(slot.title);
  const coachRef = useRef(slot.coach);
  const priceRef = useRef(slot.price);
  const capacityRef = useRef(slot.capacity);

  const initialize = useCallback(() => {
    titleRef.current = slot.title;
    coachRef.current = slot.coach;
    priceRef.current = slot.price;
    capacityRef.current = slot.capacity;
  }, [slot]);

  return (
    <Dialog>
      <div className="w-48 text-sm mx-4 mt-4 mb-2">
        <SlotDialogField
          title=""
          valueRef={titleRef}
          isEditMode={isEditMode}
          className="text-base mb-2"
        />
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
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => setIsEditMode(true)}
              >
                수정
              </button>
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => onClose(isEditedRef.current)}
              >
                닫기
              </button>
            </>
          )}
          {isEditMode && (
            <>
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => {
                  initialize();
                  setIsEditMode(false);
                }}
              >
                취소
              </button>
              <button
                className="p-2 font-bold text-gray-500"
                onClick={() => {
                  setIsEditLoading(true);
                  updateSlot(
                    {
                      ...slot,
                      title: titleRef.current,
                      coach: coachRef.current,
                      price: priceRef.current,
                      capacity: capacityRef.current,
                    },
                    slot
                  ).then(() => {
                    setIsEditLoading(false);
                    setIsEditMode(false);
                    isEditedRef.current = true;
                  });
                }}
              >
                완료
              </button>
            </>
          )}
        </div>
      </div>
      {isEditLoading && <Dialog text="수정 중" useDotAnimation={true} />}
    </Dialog>
  );
}
