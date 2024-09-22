import { collection, getDocs } from 'firebase/firestore';
import { RegistrationDataType } from './getRegistration';
import { formatDate } from '@/app/date_utils';
import RegistrationTimeSlot from './RegistrationTimeSlot';
import AccessControl from '../AccessControl';
import { firestore } from '@/firebase';

const getRegistrations = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'registration'));
    const data = querySnapshot.docs.map((doc) => {
      const registrationData = doc.data() as RegistrationDataType;
      registrationData.id = doc.id;
      if (registrationData.times) {
        registrationData.times = [
          ...registrationData.times.filter((time) => time.isRegistered == null),
          ...registrationData.times.filter((time) => time.isRegistered != null),
        ];
      }
      return registrationData;
    });
    return data;
  } catch (error) {
    console.error('Error fetching registrations: ', error);
  }
};

export default async function ManageRegistrations() {
  const registrations = await getRegistrations();

  return (
    <AccessControl>
      <div className="p-4">
        <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
        {!registrations?.length ? (
          <div className="text-center text-gray-500">
            등록된 신청서가 없습니다.
          </div>
        ) : (
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
                    <div>{formatDate(registration.birthday)}</div>
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
                    <RegistrationTimeSlot
                      initialRegistrationTimeSlots={registration.times}
                      registrationId={registration.id}
                      name={registration.name}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccessControl>
  );
}
