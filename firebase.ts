import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from '@/firebase-config';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export enum Role {
  ADMIN,
  MANAGER,
  MEMBER,
  NONE,
}

export function toRole(role: string): Role {
  switch (role) {
    case 'manager':
      return Role.MANAGER;
    case 'admin':
      return Role.ADMIN;
    case 'member':
      return Role.MEMBER;
    default:
      return Role.NONE;
  }
}

export async function getRole() {
  const user = getAuth().currentUser;
  if (user == null) return Role.NONE;

  const result = await getDoc(doc(firestore, 'users', user.uid));
  if (!result.exists()) return Role.NONE;

  return toRole(result.data()?.role);
}

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
