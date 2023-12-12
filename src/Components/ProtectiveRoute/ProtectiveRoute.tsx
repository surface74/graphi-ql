import { useNavigate, Outlet } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { pageName } from '../../common-types/common-types';

const ProtectiveRoute: FC = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate(`${pageName.login.En}`);
    }
  });

  return <>{isLogin ? <Outlet /> : null}</>;
};

export default ProtectiveRoute;
