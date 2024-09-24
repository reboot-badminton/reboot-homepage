import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebaseConfig from '@/firebase-config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export enum Role {
  ADMIN,
  MANAGER,
  MEMBER,
  NONE,
}

export async function getRole() {
  const user = getAuth().currentUser;
  if (user == null) return Role.NONE;

  const result = await getDoc(doc(firestore, 'users', user.uid));
  if (!result.exists()) return Role.NONE;
  
  const role = result.data()?.role;
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

export async function managerSignIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  auth.languageCode = 'ko';

  try {
    const result = await signInWithPopup(auth, provider);
    return !!result;
  } catch (error: any) {
    return false;
  }
}

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
