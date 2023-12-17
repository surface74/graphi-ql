import EditorPage from '../../pages/EditorPage/EditorPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/NotFoundPage/NotFoundPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { SnackbarProvider } from 'notistack';

import Language from '../../enum/language';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import ProtectiveRoute from '../ProtectiveRoute/ProtectiveRoute';
import { pageName } from '../../common-types/common-types';
import { recallLanguage, saveLanguage } from '../../utils/language';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Authority/firebase';
import { clearUserState, storeUserState } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import { startWatchdog } from '../Authority/auth-cookie';
import {
  resetAccessTokenCookie,
  setAccessTokenCookie,
} from '../Authority/auth-cookie';
import { useAuth } from '../../hooks/auth';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

function App() {
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState(recallLanguage());
  const { isLogin } = useAuth();

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
    saveLanguage(language);
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
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route
                path={`/${pageName.welcome.En}`}
                element={<WelcomePage />}
              />
              <Route
                element={
                  <ProtectiveRoute
                    condition={!isLogin}
                    redirectPath={`${pageName.editor.En}`}
                  />
                }
              >
                <Route
                  path={`/${pageName.login.En}`}
                  element={<SignInPage />}
                />
                <Route
                  path={`/${pageName.signup.En}`}
                  element={<SignUpPage />}
                />
              </Route>
              <Route
                element={
                  <ProtectiveRoute
                    condition={isLogin}
                    redirectPath={`${pageName.welcome.En}`}
                  />
                }
              >
                <Route
                  path={`/${pageName.editor.En}`}
                  element={<EditorPage />}
                />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </DataContextProvider>
    </SnackbarProvider>
  );
}

export default App;
