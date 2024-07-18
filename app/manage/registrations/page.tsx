'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import Dialog from '@/app/components/Dialog';
import { firestore } from '@/app/firebase/firebase';
import { getSlotsForDay, getSlotsForMonth, updateSlot } from '../slots/getSlot';
import TimeSlot from '@/app/data/TimeSlot';

type RegistrationData = {
  [key: string]: any;
};

function formatDate(timestamp: Timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

const handleAccept = async (slot: TimeSlot) => {
  try {
    const newSlot = {
      lessonMonth: slot.lessonMonth,
      days: slot.days || [],
      time: slot.time || 0,
      title: slot.title || '',
      coach: slot.coach || '',
      price: slot.price || 0,
      capacity: slot.capacity || 2,
      students: slot.students || [],
    };
    const slotsForMonth = await getSlotsForMonth(slot.lessonMonth);
    slot.days.map((day) => {
      const slotsForDay = getSlotsForDay(slotsForMonth, day);
      const slotByDayTime = slotsForDay.find(
        (slotForDay) => slotForDay.time == slot.time
      );
      if (slotByDayTime) updateSlot(newSlot, slotByDayTime);
    });
    window.alert('슬롯이 업데이트되었습니다.');
  } catch (error) {
    console.error('Error updating slot: ', error);
  }
};

export default function ManageRegistrations() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetchRegistrations();
  }, []);

  if (isLoading) {
    return <Dialog text="로딩 중입니다..." useDotAnimation={true} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
      <div className="flex flex-row flex-wrap gap-2 items-start justify-around">
        {registrations.map((registration, index) => {
          return (
            <div
              key={registration.id}
              className="w-52 sm:w-72 md:w-2/5 lg:w-72"
            >
              <div>{'#' + (index + 1)}</div>
              <div className="p-2 border-2 text-sm *:whitespace-nowrap">
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
                    {registration.times?.map(
                      (slot: TimeSlot, index: number) => {
                        return (
                          <div
                            key={index}
                            className="sm:flex sm:gap-2 sm:items-center sm:justify-between"
                          >
                            {slot.title}/{slot.coach}/{slot.time}
                            <div className="flex gap-4 my-1 justify-center">
                              <div
                                className="cursor-pointer hover:text-blue-400"
                                onClick={() => {
                                  handleAccept(slot);
                                  console.log('수락합니다.');
                                }}
                              >
                                수락
                              </div>
                              <div
                                className="cursor-pointer hover:text-red-400"
                                onClick={() => {
                                  console.log('거절합니다.');
                                }}
                              >
                                거절
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
