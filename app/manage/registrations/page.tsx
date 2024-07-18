'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Dialog from '@/app/components/Dialog';
import { firestore } from '@/app/firebase/firebase';
import { updateSlot } from '../slots/getSlot';
import TimeSlot from '@/app/data/TimeSlot';
import {
  formatDate,
  RegistrationDataType,
  updateRegistration,
} from './getRegistration';

const handleAccept = async (slot: TimeSlot, registrationName: string) => {
  try {
    const newSlot = {
      ...slot,
      students: [...slot.students, registrationName],
    };
    updateSlot(newSlot, slot);
    window.alert('슬롯이 업데이트되었습니다.');
  } catch (error) {
    console.error('Error updating slot: ', error);
  }
};

const handleReject = async (
  registration: RegistrationDataType,
  index: number
) => {
  try {
    // 신청서의 times 배열에서 해당 slot을 삭제
    const updatedTimes = registration.times.filter(
      (_: TimeSlot, i: number) => i !== index
    );
    await updateRegistration(registration.id, { times: [...updatedTimes] });

    window.alert('신청서에서 슬롯이 삭제되었습니다.');
  } catch (error) {
    console.error('Error updating registration: ', error);
  }
};

export default function ManageRegistrations() {
  const [registrations, setRegistrations] = useState<RegistrationDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchRegistrations = async () => {
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
  };
  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  if (isLoading) {
    return <Dialog text="로딩 중입니다..." useDotAnimation={true} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
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
                      {slot.title}/{slot.coach}/{slot.time}
                      <div className="flex gap-4 my-1 justify-center sm:justify-start">
                        <div
                          className="cursor-pointer hover:text-blue-400"
                          onClick={() => {
                            handleAccept(slot, registration.name);
                            console.log('수락합니다.');
                          }}
                        >
                          수락
                        </div>
                        <div
                          className="cursor-pointer hover:text-red-400"
                          onClick={() => {
                            handleReject(registration, index);
                            console.log('거절합니다.');
                          }}
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
