import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { enqueueSnackbar } from 'notistack';
import ErrorMessages from '../../assets/errorMessages.json';
import Storage from '../../utils/Storage/Storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

export const authApp = initializeApp(firebaseConfig);
export const auth = getAuth(authApp);
export const db = getFirestore();
export const logOut = () => {
  const language = Storage.recallLanguage();
  const error = ErrorMessages.ERROR_LOGOUT_USER as { Ru: string; En: string };
  signOut(auth).catch(() => {
    enqueueSnackbar(error[language], {
      variant: 'error',
    });
  });
};
