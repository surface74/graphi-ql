import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectiveRoute from '../ProtectiveRoute/ProtectiveRoute';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import EditorPage from '../../pages/EditorPage/EditorPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { pageName } from '../../common-types/common-types';
import { useAuth } from '../../hooks/auth';
import AuthPage from '../../pages/AuthPage/AuthPage';
import { AuthActionType } from '../../pages/AuthPage/AuthPage.types';

export const AppRoutes: FC = () => {
  const { isLogin } = useAuth();
  console.log('isLogin: ', isLogin);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path={`/${pageName.welcome.En}`} element={<WelcomePage />} />

      <Route
        path={`/${pageName.login.En}`}
        element={
          <ProtectiveRoute
            condition={!isLogin}
            element={<AuthPage authActionType={AuthActionType.LOGIN} />}
            redirectPath={`/${pageName.main.En}`}
          />
        }
      />

      <Route
        path={`/${pageName.signup.En}`}
        element={
          <ProtectiveRoute
            condition={!isLogin}
            element={<AuthPage authActionType={AuthActionType.SIGNUP} />}
            redirectPath={`/${pageName.main.En}`}
          />
        }
      />

      <Route
        path={`/${pageName.main.En}`}
        element={
          <ProtectiveRoute
            condition={isLogin}
            element={<EditorPage />}
            redirectPath={`/${pageName.welcome.En}`}
          />
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
