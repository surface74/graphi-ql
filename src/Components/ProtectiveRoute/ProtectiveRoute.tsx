import { useNavigate, Outlet } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';

const ProtectiveRoute: FC = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  });

  return <Outlet />;
};

export default ProtectiveRoute;
