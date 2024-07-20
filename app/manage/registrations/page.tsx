'use client';

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Dialog from '@/app/components/Dialog';
import { firestore } from '@/app/firebase/firebase';
import { updateSlot } from '../slots/getSlot';
import TimeSlot from '@/app/data/TimeSlot';
import { RegistrationDataType, updateRegistration } from './getRegistration';
import { formatDate } from './date_utils';
import RegistrationDecisionDialog from './RegistrationSelectDialog';

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
      }));
      setRegistrations(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching registrations: ', error);
      setIsLoading(false);
    }
  }, []);

  const handleAccept = useCallback(
    async (
      slot: TimeSlot,
      registration: RegistrationDataType,
      index: number
    ) => {
      try {
        const newSlot = {
          ...slot,
          students: [...slot.students, registration.name],
        };
        updateSlot(newSlot, slot);
        const updatedTimes = registration.times.map(
          (time: TimeSlot, i: number) =>
            i === index ? { ...time, isRegistered: true } : time
        );

        await updateRegistration(registration.id, { times: [...updatedTimes] });
        setIsDecisionClicked(true);
        setDecisionFeedback('수락되었습니다.');
      } catch (error) {
        console.error('Error updating slot: ', error);
      }
    },
    []
  );

  const handleReject = useCallback(
    async (registration: RegistrationDataType, index: number) => {
      try {
        const updatedTimes = registration.times.map(
          (time: TimeSlot, i: number) =>
            i === index ? { ...time, isRegistered: false } : time
        );

        await updateRegistration(registration.id, { times: [...updatedTimes] });
        setIsDecisionClicked(true);
        setDecisionFeedback('거절되었습니다.');
      } catch (error) {
        console.error('Error updating registration: ', error);
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
              <div>
                <div>신청시간 :</div>
                <div className="text-center">
                  {registration.times?.map((slot: TimeSlot, index: number) => (
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
                      <div className="flex gap-4 my-1 justify-center sm:justify-start">
                        <div
                          className="cursor-pointer hover:text-blue-400"
                          onClick={() =>
                            handleAccept(slot, registration, index)
                          }
                        >
                          수락
                        </div>
                        <div
                          className="cursor-pointer hover:text-red-400"
                          onClick={() => handleReject(registration, index)}
                        >
                          거절
                        </div>
                      </div>
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
