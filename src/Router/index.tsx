import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../components/PrivateRoute/index'
import Categories from '../pages/Categories/Categories.lazy'
import Details from '../pages/Details/Details.lazy'
import Home from '../pages/Home/Home.lazy'
import Login from '../pages/Login/Login.lazy'
import NotFound from '../pages/NotFound/NotFound.lazy'
import { RoutePaths } from './RoutePaths'

export function Router() {
	return (
		<Routes>
			<Route path={RoutePaths.Home} element={<Home />} />
			<Route
				path={RoutePaths.Categories}
				element={
					<PrivateRoute>
						<Categories />
					</PrivateRoute>
				}
			/>
			<Route
				path={RoutePaths.Details}
				element={
					<PrivateRoute>
						<Details />
					</PrivateRoute>
				}
			/>
			<Route path={RoutePaths.Login} element={<Login />} />
			<Route path={RoutePaths.NotFound} element={<NotFound />} />
		</Routes>
	)
}
