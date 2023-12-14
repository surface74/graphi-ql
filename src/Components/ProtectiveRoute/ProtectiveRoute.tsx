import { useNavigate, Outlet } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { IProtectiveRouteProps } from './ProtectiveRoute.types';

const ProtectiveRoute: FC<IProtectiveRouteProps> = ({
  condition,
  redirectPath,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!condition) {
      navigate(redirectPath);
    }
  });

  return <>{condition ? <Outlet /> : null}</>;
};

export default ProtectiveRoute;
