'use client';

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Dialog from '@/app/components/Dialog';
import { firestore } from '@/app/firebase/firebase';
import { updateSlot } from '../slots/getSlot';
import TimeSlot from '@/app/data/TimeSlot';
import { RegistrationDataType, updateRegistration } from './getRegistration';
import { formatDate } from '@/app/date_utils';

export default function ManageRegistrations() {
  const [registrations, setRegistrations] = useState<RegistrationDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const fetchRegistrations = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'registration')
      );
      const data = querySnapshot.docs.map((doc) => {
        const registrationData = doc.data() as RegistrationDataType;
        registrationData.id = doc.id;
        if (registrationData.times) {
          registrationData.times.sort((a, b) => {
            if (a.isRegistered === undefined && b.isRegistered !== undefined)
              return -1;
            if (a.isRegistered !== undefined && b.isRegistered === undefined)
              return 1;
            return 0;
          });
        }
        return registrationData;
      });
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
      slotIndexToUpdate: number,
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
          i === slotIndexToUpdate ? { ...time, isRegistered: isAccepted } : time
        );
        await updateRegistration(registration.id, { times: updatedTimes });
        setDialogText(isAccepted ? '수락 완료했습니다' : '거절 완료했습니다');
        setIsSuccess(true);
        await fetchRegistrations();
        setTimeout(() => {
          setDialogText('');
          setIsSuccess(false);
        }, 1000);
      } catch (error) {
        console.error('Error updating slot: ', error);
      }
    },
    []
  );

  useEffect(() => {
    fetchRegistrations();
  }, []);

  if (isLoading) {
    return <Dialog text="로딩 중입니다..." useDotAnimation={true} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
      {isSuccess && <Dialog text={dialogText} useDotAnimation={false} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {registrations.map((registration, registrationIndex) => (
          <div key={registration.id} className="p-4 rounded shadow">
            <div>{'#' + (registrationIndex + 1)}</div>
            <div className="p-2 text-sm whitespace-nowrap">
              <div className="flex gap-4">
                <div>이름 :</div>
                <div>{registration.name ?? '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>성별 :</div>
                <div>{registration.gender ?? '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>전화번호 :</div>
                <div>{registration.phone ?? '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>생년월일 :</div>
                <div>{formatDate(registration.birthday) ?? '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>급수 :</div>
                <div>{registration.level ?? '-'}</div>
              </div>
              <div className="flex gap-4">
                <div>목표 :</div>
                <div>{registration.goal ?? '-'}</div>
              </div>
              <div className="w-full whitespace-normal flex gap-4">
                <div className="whitespace-nowrap">하고 싶은 말 :</div>
                <div>{registration.others ?? '-'}</div>
              </div>
              <div>
                <div>신청시간 :</div>
                <div className="text-center">
                  {registration.times?.map((slot, slotIndexToUpdate) => (
                    <div
                      key={slotIndexToUpdate}
                      className="flex lg:flex-col gap-2 items-center justify-between"
                    >
                      <p>
                        {slot.title}/{slot.coach}/{slot.time}
                        {slot.isRegistered != null && (
                          <span>
                            /{slot.isRegistered ? '수락됨' : '거절됨'}
                          </span>
                        )}
                      </p>
                      {slot.isRegistered == null && (
                        <div className="flex gap-4 my-1 justify-center sm:justify-start">
                          <div
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() =>
                              updateSlotRegistration(
                                registration,
                                slotIndexToUpdate,
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
                              updateSlotRegistration(
                                registration,
                                slotIndexToUpdate,
                                false
                              )
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
