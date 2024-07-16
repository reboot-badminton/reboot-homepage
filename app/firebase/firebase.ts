import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from '@/firebase-config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export async function managerSignIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  auth.languageCode = 'ko';

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result)!;
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
}

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
