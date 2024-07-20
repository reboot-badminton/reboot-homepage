'use client';

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Dialog from '@/app/components/Dialog';
import { firestore } from '@/app/firebase/firebase';
import { updateSlot } from '../slots/getSlot';
import TimeSlot from '@/app/data/TimeSlot';
import { RegistrationDataType, updateRegistration } from './getRegistration';
import RegistrationDecisionDialog from './RegistrationSelectDialog';
import { formatDate } from '@/app/date_utils';

export default function ManageRegistrations() {
  const [registrations, setRegistrations] = useState<RegistrationDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDecisionClicked, setIsDecisionClicked] = useState(false);
  const [decisionFeedback, setDecisionFeedback] = useState('');

  const fetchRegistrations = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'registration')
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RegistrationDataType[];
      setRegistrations(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching registrations: ', error);
      setIsLoading(false);
    }
  }, []);

  const updateSlotRegistration = useCallback(
    async (
      registration: RegistrationDataType,
      index: number,
      isAccepted: boolean,
      slot?: TimeSlot
    ) => {
      try {
        if (isAccepted && slot) {
          const { isRegistered, ...slotWithoutIsRegistered } = slot;
          const newSlot = {
            ...slotWithoutIsRegistered,
            students: [...slot.students, registration.name],
          };
          updateSlot(newSlot, slot);
        }
        const updatedTimes = registration.times.map((time, i) =>
          i === index ? { ...time, isRegistered: isAccepted } : time
        );
        // updatedTimes 배열을 정렬
        updatedTimes.sort((a, b) => {
          if (a.isRegistered === undefined && b.isRegistered !== undefined)
            return -1;
          if (a.isRegistered !== undefined && b.isRegistered === undefined)
            return 1;
          return 0;
        });
        await updateRegistration(registration.id, { times: [...updatedTimes] });
        setIsDecisionClicked(true);
        setDecisionFeedback(isAccepted ? '수락되었습니다.' : '거절되었습니다.');
      } catch (error) {
        console.error('Error updating slot: ', error);
      }
    },
    []
  );

  useEffect(() => {
    fetchRegistrations();
  }, [decisionFeedback]);

  if (isLoading) {
    return <Dialog text="로딩 중입니다..." useDotAnimation={true} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
      {isDecisionClicked && (
        <RegistrationDecisionDialog
          text={decisionFeedback}
          onConfirm={() => setIsDecisionClicked(false)}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {registrations.map((registration, index) => (
          <div key={registration.id} className="p-4 rounded shadow">
            <div>{'#' + (index + 1)}</div>
            <div className="p-2 text-sm whitespace-nowrap">
              <div className="flex gap-4">
                <div>이름 :</div>
                <div>{registration.name || '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>성별 :</div>
                <div>{registration.gender || '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>전화번호 :</div>
                <div>{registration.phone || '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>생년월일 :</div>
                <div>{formatDate(registration.birthday) || '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>급수 :</div>
                <div>{registration.level || '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>목표 :</div>
                <div>{registration.goal || '-'}</div>
              </div>
              <div className="w-full whitespace-normal flex gap-4">
                <div className="whitespace-nowrap">하고 싶은 말 :</div>
                <div>{registration.others || '-'}</div>
              </div>
              <div>
                <div>신청시간 :</div>
                <div className="text-center">
                  {registration.times?.map((slot, index) => (
                    <div
                      key={index}
                      className="flex lg:flex-col gap-2 items-center justify-between"
                    >
                      <p>
                        {slot.title}/{slot.coach}/{slot.time}
                        {slot.isRegistered !== undefined && (
                          <span>
                            /{slot.isRegistered ? '수락됨' : '거절됨'}
                          </span>
                        )}
                      </p>
                      {slot.isRegistered == undefined && (
                        <div className="flex gap-4 my-1 justify-center sm:justify-start">
                          <div
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() =>
                              updateSlotRegistration(
                                registration,
                                index,
                                true,
                                slot
                              )
                            }
                          >
                            수락
                          </div>
                          <div
                            className="cursor-pointer hover:text-red-400"
                            onClick={() =>
                              updateSlotRegistration(registration, index, false)
                            }
                          >
                            거절
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
