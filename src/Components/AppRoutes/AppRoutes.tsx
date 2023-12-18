import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectiveRoute from '../ProtectiveRoute/ProtectiveRoute';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import EditorPage from '../../pages/EditorPage/EditorPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { pageName } from '../../common-types/common-types';
import { useAuth } from '../../hooks/auth';

export const AppRoutes: FC = () => {
  const { isLogin } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path={`/${pageName.welcome.En}`} element={<WelcomePage />} />
      <Route
        element={
          <ProtectiveRoute
            condition={!isLogin}
            redirectPath={`${pageName.main.En}`}
          />
        }
      >
        <Route path={`/${pageName.login.En}`} element={<SignInPage />} />
        <Route path={`/${pageName.signup.En}`} element={<SignUpPage />} />
      </Route>
      <Route
        element={
          <ProtectiveRoute
            condition={isLogin}
            redirectPath={`${pageName.welcome.En}`}
          />
        }
      >
        <Route path={`/${pageName.main.En}`} element={<EditorPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
