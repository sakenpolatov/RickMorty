import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute/index';
import Categories from '../pages/Categories/Categories.lazy';
import Details from '../pages/Details/Details.lazy';
import Home from '../pages/Home/Home.lazy';
import Login from '../pages/Login/Login.lazy';
import NotFound from '../pages/NotFound/NotFound.lazy';
import { RoutePaths } from './RoutePaths';
import { RouteWithErrorBoundary } from '../components/RouteWithErrorBoundary';

export function Router() {
  return (
    <Routes>
      <Route
        path={RoutePaths.Home}
        element={
          <RouteWithErrorBoundary>
            <Home />
          </RouteWithErrorBoundary>
        }
      />
      <Route
        path={RoutePaths.Categories}
        element={
          <RouteWithErrorBoundary>
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          </RouteWithErrorBoundary>
        }
      />
      <Route
        path={RoutePaths.Details}
        element={
          <RouteWithErrorBoundary>
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          </RouteWithErrorBoundary>
        }
      />
      <Route path={RoutePaths.Login} element={<Login />} />
      <Route path={RoutePaths.NotFound} element={<NotFound />} />
    </Routes>
  );
}
