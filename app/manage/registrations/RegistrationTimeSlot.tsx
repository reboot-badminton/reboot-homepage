'use client';

import TimeSlot from '@/app/data/TimeSlot';
import { useDialog } from '@/app/providers/DialogProvider';
import CircularProgressIndicator from '@/components/CircularProgressIndicator';
import { firestore } from '@/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { updateSlot } from '../slots/getSlot';
import { RegistrationDataType } from './getRegistration';

interface RegistrationTimeSlotProps {
  initialRegistrationTimeSlots: TimeSlot[];
  registrationId: string;
  name: string;
}

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
  const { showDialog } = useDialog();

  const updateTimeSlot = async (
    isAccepted: boolean,
    timeSlotIndex: number,
    slot?: TimeSlot
  ) => {
    showDialog({
      body: <CircularProgressIndicator />,
    });
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
    showDialog({
      title: isAccepted ? ACCEPT_TEXT : REJECT_TEXT,
      onConfirm: () => true,
    });
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
                className="cursor-pointer text-blue-400 hoverable:hover:text-blue-700 active:text-blue-700"
                onClick={() => updateTimeSlot(true, timeSlotIndex, slot)}
              >
                수락
              </div>
              <div
                className="cursor-pointer text-red-400 hoverable:hover:text-red-700 active:text-blue-700"
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
