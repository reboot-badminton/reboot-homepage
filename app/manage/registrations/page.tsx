'use client';

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Dialog from '@/app/components/Dialog';
import { firestore } from '@/app/firebase/firebase';
import { updateSlot } from '../slots/getSlot';
import TimeSlot from '@/app/data/TimeSlot';
import { RegistrationDataType, updateRegistration } from './getRegistration';
import { formatDate } from '@/app/date_utils';
import { ConfirmDialogButton } from '@/app/components/DialogButtons';

const UPDATING_TEXT = '업데이트 중입니다...';
const ACCEPT_TEXT = '수락 완료했습니다';
const NOTACCEPT_TEXT = '거절 완료했습니다';

export default function ManageRegistrations() {
  const [registrations, setRegistrations] = useState<RegistrationDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
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
          registrationData.times = [
            ...registrationData.times.filter(
              (time) => time.isRegistered == null
            ),
            ...registrationData.times.filter(
              (time) => time.isRegistered != null
            ),
          ];
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
      timeSlotIndex: number,
      isAccepted: boolean,
      slot?: TimeSlot
    ) => {
      try {
        setDialogText(UPDATING_TEXT);
        if (isAccepted && slot) {
          const { isRegistered, ...slotWithoutIsRegistered } = slot;
          const newSlot = {
            ...slotWithoutIsRegistered,
            students: [...slot.students, registration.name],
          };
          updateSlot(newSlot, slot);
        }
        const updatedTimes = registration.times.map((time, i) =>
          i === timeSlotIndex ? { ...time, isRegistered: isAccepted } : time
        );
        await updateRegistration(registration.id, { times: updatedTimes });
        setDialogText(isAccepted ? ACCEPT_TEXT : NOTACCEPT_TEXT);
        await fetchRegistrations();
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
      {dialogText && (
        <Dialog
          text={dialogText}
          useDotAnimation={dialogText === UPDATING_TEXT}
        >
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
      )}
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
                  {registration.times?.map((slot, timeSlotIndex) => (
                    <div
                      key={timeSlotIndex}
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
                                timeSlotIndex,
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
                                timeSlotIndex,
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
