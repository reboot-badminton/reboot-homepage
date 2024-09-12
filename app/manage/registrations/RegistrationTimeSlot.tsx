'use client';

import { useEffect, useState } from 'react';
import TimeSlot from '@/app/data/TimeSlot';
import { RegistrationDataType } from './getRegistration';
import { updateSlot } from '../slots/getSlot';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import Dialog from '@/app/components/Dialog';
import { ConfirmDialogButton } from '@/app/components/DialogButtons';

interface RegistrationTimeSlotProps {
  initialRegistrationTimeSlots: TimeSlot[];
  registrationId: string;
  name: string;
}

const UPDATING_TEXT = '업데이트 중입니다';
const ACCEPT_TEXT = '수락 완료했습니다';
const REJECT_TEXT = '거절 완료했습니다';

export default function RegistrationTimeSlot({
  initialRegistrationTimeSlots,
  registrationId,
  name,
}: RegistrationTimeSlotProps) {
  const [registrationTimeSlots, setRegistrationTimeSlots] = useState(
    initialRegistrationTimeSlots
  );
  const [dialogText, setDialogText] = useState('');

  const updateTimeSlot = async (
    isAccepted: boolean,
    timeSlotIndex: number,
    slot?: TimeSlot
  ) => {
    setDialogText(UPDATING_TEXT);
    if (isAccepted && slot) {
      const { isRegistered, ...slotWithoutIsRegistered } = slot;
      const newSlot = {
        ...slotWithoutIsRegistered,
        students: [...slot.students, name],
      };
      updateSlot(newSlot, slot);
    }
    const updatedTimes = registrationTimeSlots.map((time, i) =>
      i === timeSlotIndex ? { ...time, isRegistered: isAccepted } : time
    );
    const registrationRef = doc(firestore, 'registration', registrationId);
    await updateDoc(registrationRef, { times: updatedTimes });
    setDialogText(isAccepted ? ACCEPT_TEXT : REJECT_TEXT);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, 'registration', registrationId),
      (doc) => {
        const result = doc.data() as RegistrationDataType;
        if (result?.times) {
          result.times = [
            ...result.times.filter((time) => time.isRegistered == null),
            ...result.times.filter((time) => time.isRegistered != null),
          ];
          setRegistrationTimeSlots(result.times);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  if (dialogText) {
    return (
      <Dialog text={dialogText} useDotAnimation={dialogText === UPDATING_TEXT}>
        <div className="p-4 flex flex-col gap-4 items-center justify-around">
          {dialogText !== UPDATING_TEXT && (
            <ConfirmDialogButton
              onClick={() => {
                setDialogText('');
              }}
            />
          )}
        </div>
      </Dialog>
    );
  }

  return (
    <div className="text-center">
      {registrationTimeSlots?.map((slot, timeSlotIndex) => (
        <div
          key={timeSlotIndex}
          className="flex lg:flex-col gap-2 items-center justify-between"
        >
          <p>
            {slot.title}/{slot.coach}/{slot.time}
            {slot.isRegistered != null && (
              <span>/{slot.isRegistered ? '수락됨' : '거절됨'}</span>
            )}
          </p>
          {slot.isRegistered == null && (
            <div className="flex gap-4 my-1 justify-center sm:justify-start">
              <div
                className="cursor-pointer hover:text-blue-400"
                onClick={() => updateTimeSlot(true, timeSlotIndex, slot)}
              >
                수락
              </div>
              <div
                className="cursor-pointer hover:text-red-400"
                onClick={() => updateTimeSlot(false, timeSlotIndex)}
              >
                거절
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
