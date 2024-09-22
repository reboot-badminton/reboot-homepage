import { initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const app = initializeApp(clientConfig);
export const firestore = getFirestore(app);

export async function getRole() {
  const user = getAuth().currentUser;
  if (user == null) return null;

  const result = await getDoc(doc(firestore, 'users', user.uid));
  if (!result.exists()) return null;

  return result.data().role;
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
