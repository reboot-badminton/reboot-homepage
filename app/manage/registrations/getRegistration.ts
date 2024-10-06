import TimeSlot from '@/app/data/TimeSlot';
import { firestore } from '@/firebase';
import { collection, doc, getDocs, Timestamp, updateDoc } from 'firebase/firestore';

interface Registration {
  times: TimeSlot[];
  name: string;
  gender: string;
  phone: string;
  level: string;
  birthday: Timestamp;
  goal: string;
  others: string;
}

export interface RegistrationDataType extends Registration {
  id: string;
}

export const getRegistrations = async () => {
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
};

export const updateRegistration = async (
  registrationId: string,
  updatedData: Partial<Registration>
) => {
  const registrationRef = doc(firestore, 'registration', registrationId);
  await updateDoc(registrationRef, updatedData);
};
