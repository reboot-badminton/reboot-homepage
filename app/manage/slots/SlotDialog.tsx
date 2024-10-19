'use client';

import TimeSlot from '@/app/data/TimeSlot';
import { CancelDialogButton, ConfirmDialogButton } from '@/components/DialogButtons';
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
  const timeRef = useRef(slot.time);
  const durationRef = useRef(slot.duration ?? 1);

  const initialize = useCallback(() => {
    titleRef.current = slot.title;
    daysRef.current = slot.days;
    coachRef.current = slot.coach;
    priceRef.current = slot.price;
    capacityRef.current = slot.capacity;
    timeRef.current = slot.time;
    durationRef.current = slot.duration;
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
      <SlotDialogField
        title="시작"
        valueRef={timeRef}
        suffix="시"
        isEditMode={isEditMode}
      />
      <SlotDialogField
        title="시간"
        valueRef={durationRef}
        suffix="시간"
        isEditMode={isEditMode}
      />
      <div className="mt-2">
        <span className="block">
          <b>현재 레슨생</b> ({slot.students.length}명)
        </span>
        <span>{slot.students.join(', ')}</span>
      </div>
      <div className="flex flex-row justify-end">
        {!isEditMode && (
          <>
            <div
              className="p-2 font-bold text-gray-500 cursor-pointer hoverable:hover:text-gray-700 active:text-gray-700"
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
              className="p-2 font-bold text-gray-500 cursor-pointer hoverable:hover:text-gray-700 active:text-gray-700"
              onClick={() => setIsEditMode(true)}
            >
              수정
            </div>
            <div
              className="p-2 font-bold text-gray-500 cursor-pointer hoverable:hover::text-gray-700 active:text-gray-700"
              onClick={() => onClose(isEditedRef.current)}
            >
              닫기
            </div>
          </>
        )}
        {isEditMode && (
          <>
            <CancelDialogButton onClick={() => {
              if (isAddMode) {
                onClose(false);
              } else {
                initialize();
                setIsEditMode(false);
              }
            }} />
            <ConfirmDialogButton onClick={() => {
              setIsEditLoading(true);
              updateSlot(
                {
                  ...slot,
                  title: titleRef.current,
                  days: daysRef.current,
                  coach: coachRef.current,
                  price: priceRef.current,
                  capacity: capacityRef.current,
                  time: timeRef.current,
                  duration: durationRef.current,
                },
                slot
              ).then(() => {
                onClose(true);
              });
            }} />
          </>
        )}
      </div>
    </div>
  );
}
