import TimeSlot from '@/app/data/TimeSlot';
import { firestore } from '@/app/firebase/firebase';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';

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

export const updateRegistration = async (
  registrationId: string,
  updatedData: Partial<Registration>
) => {
  const registrationRef = doc(firestore, 'registration', registrationId);
  await updateDoc(registrationRef, updatedData);
};
