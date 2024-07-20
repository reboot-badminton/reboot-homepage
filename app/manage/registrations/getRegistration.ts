import { firestore } from '@/app/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export type RegistrationDataType = {
  [key: string]: any;
};

export const updateRegistration = async (
  registrationId: string,
  updatedData: RegistrationDataType
) => {
  const registrationRef = doc(firestore, 'registration', registrationId);
  try {
    await updateDoc(registrationRef, updatedData);
  } catch (error) {
    console.error('Error updating registration: ', error);
  }
};
