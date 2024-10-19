export const clientConfig = {
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'reboot-badminton-2508e',
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    'AIzaSyB2kI7MQ78zTKGteegihOMUnihB3SMGQYQ',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    'reboot-badminton-2508e.firebaseapp.com',
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ??
    'reboot-badminton.firebaseio.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '975042949911',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    'reboot-badminton-2508e.appspot.com',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    '1:975042949911:web:6036289f404affd0203d52',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'G-GSY1NQHZXE',
};
