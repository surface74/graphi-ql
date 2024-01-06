import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { IProtectiveRouteProps } from './ProtectiveRoute.types';

const ProtectiveRoute: FC<IProtectiveRouteProps> = ({
  condition,
  redirectPath,
}) => {
  if (!condition) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectiveRoute;
