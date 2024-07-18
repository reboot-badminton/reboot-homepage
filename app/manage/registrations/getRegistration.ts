import { firestore } from "@/app/firebase/firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
export type RegistrationDataType = {
  [key: string]: any;
};

export const updateRegistration = async (registrationId: string, updatedData: Partial<RegistrationDataType>) => {
  const registrationRef = doc(firestore, 'registration', registrationId);
  try {
    await updateDoc(registrationRef, updatedData);
    console.log('Registration updated successfully');
  } catch (error) {
    console.error('Error updating registration: ', error);
  }
};

export function formatDate(timestamp: Timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
