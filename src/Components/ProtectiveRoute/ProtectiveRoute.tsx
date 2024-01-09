import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { IProtectiveRouteProps } from './ProtectiveRoute.types';

const ProtectiveRoute: FC<IProtectiveRouteProps> = ({
  condition,
  element,
  redirectPath,
}) => {
  if (!condition) {
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export default ProtectiveRoute;
