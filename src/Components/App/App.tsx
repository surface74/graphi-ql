import styles from './App.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { SnackbarProvider } from 'notistack';
import Language from '../../enum/language';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Authority/firebase';
import { clearUserState, storeUserState } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import { startWatchdog } from '../Authority/auth-cookie';
import {
  resetAccessTokenCookie,
  setAccessTokenCookie,
} from '../Authority/auth-cookie';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import Storage from '../../utils/Storage/Storage';
import { AppRoutes } from '../AppRoutes/AppRoutes';

function App() {
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState(Storage.recallLanguage());

  const clearUser = () => {
    resetAccessTokenCookie();
    dispatch(clearUserState());
  };

  useEnhancedEffect(() => {
    startWatchdog();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser
          ?.getIdToken()
          .then((token) => {
            setAccessTokenCookie(token);
            dispatch(
              storeUserState({
                user: {
                  email: user.email ?? '',
                  id: user.uid,
                  token,
                },
              })
            );
          })
          .catch(() => {
            clearUser();
          });
      } else {
        clearUser();
      }
    });
  }, []);

  const switchLanguage = (language: Language) => {
    Storage.saveLanguage(language);
    setLanguage(language);
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      Components={{
        success: CustomSnackbar,
        info: CustomSnackbar,
        error: CustomSnackbar,
        default: CustomSnackbar,
        warning: CustomSnackbar,
      }}
    >
      <DataContextProvider
        value={{
          language,
          setLanguage: switchLanguage,
        }}
      >
        <div className={styles['container']}>
          <Header />
          <div className={styles['content']}>
            <AppRoutes />
          </div>
        </div>
        <Footer />
      </DataContextProvider>
    </SnackbarProvider>
  );
}

export default App;
