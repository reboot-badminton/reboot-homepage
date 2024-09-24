import { initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
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

export async function GoogleAuthSignIn() {
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

export const app = initializeApp(clientConfig);
export const firestore = getFirestore(app);
