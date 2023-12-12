import EditorPage from '../../pages/EditorPage/EditorPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/NotFoundPage/NotFoundPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import Language from '../../enum/language';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import { useAuth } from '../../hooks/auth';
import ProtectiveRoute from '../ProtectiveRoute/ProtectiveRoute';
import { pageName } from '../../common-types/common-types';

function App() {
  const [language, setLanguage] = useState(Language.En);

  const { isLogin } = useAuth();
  console.log('isLogin: ', isLogin);

  const switchLanguage = (language: Language) => {
    setLanguage(language);
  };

  return (
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
            <Route path={`/${pageName.welcome.En}`} element={<WelcomePage />} />
            <Route path={`/${pageName.login.En}`} element={<SignInPage />} />
            <Route path={`/${pageName.signup.En}`} element={<SignUpPage />} />
            <Route element={<ProtectiveRoute />}>
              <Route path={`/${pageName.editor.En}`} element={<EditorPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </DataContextProvider>
  );
}

export default App;
