import EditorPage from '../../pages/EditorPage/EditorPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/NotFoundPage/NotFoundPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import Header from '../Header/Header';

function App() {
  return (
    <div className={styles['container']}>
      <Header />
      <div className={styles['content']}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/Welcome" element={<WelcomePage />} />
          <Route path={`/Login/`} element={<LoginPage />} />
          <Route path={`/Editor/`} element={<EditorPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
