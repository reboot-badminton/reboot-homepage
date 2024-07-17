'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import Dialog from '@/app/components/Dialog';
import { firestore } from '@/app/firebase/firebase';

type RegistrationData = {
  [key: string]: any;
};

// 날짜 포맷팅 함수
function formatDate(timestamp: Timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function ManageRegistrations() {
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
  console.log(registrations);
  if (isLoading) {
    return <Dialog text="로딩 중입니다..." useDotAnimation={true} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
      {registrations.map((registration, index) => {
        return (
          <div key={registration.id}>
            <div>{index + 1}</div>
            <div>
              <div className="flex">
                <div>이름</div>
                <div>{registration.name}</div>
              </div>
              <div className="flex">
                <div>성별</div>
                <div>{registration.gender}</div>
              </div>
              <div className="flex">
                <div>전화번호</div>
                <div>{registration.phone}</div>
              </div>
              <div className="flex">
                <div>생년월일</div>
                <div>{formatDate(registration.birthday)}</div>
              </div>
              <div className="flex">
                <div>급수</div>
                <div>{registration.level}</div>
              </div>
              <div className="flex">
                <div>목표</div>
                <div>{registration.goal}</div>
              </div>
              <div className="flex">
                <div>신청시간</div>
                <div>
                  {registration.times?.map((time:any) => {
                    return (<div>{time.title}</div>);
                  })}
                </div>
              </div>
            </div>
            <div>
              수락하기
            </div>
            <div>
              거절하기
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ManageRegistrations;
