import ErrorBoundary from '../../components/ErrorBoundary';
import { useLocation } from 'react-router-dom';

interface RouteWithErrorBoundaryProps {
  children: React.ReactNode;
}

export const RouteWithErrorBoundary: React.FC<RouteWithErrorBoundaryProps> = ({
  children,
}): React.JSX.Element => {
  const location = useLocation();
  return <ErrorBoundary key={location?.pathname}>{children}</ErrorBoundary>;
};
