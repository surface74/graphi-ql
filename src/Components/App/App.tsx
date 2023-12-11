import EditorPage from '../../pages/EditorPage/EditorPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/NotFoundPage/NotFoundPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import Header from '../Header/Header';
import { useState } from 'react';
import Language from '../../enum/language';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import UIStrings from '../../assets/UIStrings.json';
import Authority from '../Authority/Authority';

function App() {
  const [language, setLanguage] = useState(Language.En);

  const switchLanguage = (language: Language) => {
    setLanguage(language);
  };

  const pageName = {
    welcome: {
      Ru: UIStrings.Welcome.Ru,
      En: UIStrings.Welcome.En,
    },
    login: {
      Ru: UIStrings.Login.Ru,
      En: UIStrings.Login.En,
    },
    editor: {
      Ru: UIStrings.Editor.Ru,
      En: UIStrings.Editor.En,
    },
  };

  const authority = new Authority();

  return (
    <DataContextProvider
      value={{
        language,
        setLanguage: switchLanguage,
        pageName,
        authority,
      }}
    >
      <div className={styles['container']}>
        <Header />
        <div className={styles['content']}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path={`/${pageName.welcome.En}`} element={<WelcomePage />} />
            <Route path={`/${pageName.login.En}`} element={<LoginPage />} />
            <Route path={`/${pageName.editor.En}`} element={<EditorPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </DataContextProvider>
  );
}

export default App;
