import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/AuthProvider';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();
  const location = useLocation();

  if (auth === undefined || auth.user === null) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
