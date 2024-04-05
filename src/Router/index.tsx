import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../components/PrivateRoute/index'
import { CategoriesWrapper } from '../pages/Categories/CategoriesWrapper'
import { DetailsWrapper } from '../pages/Details/DetailsWrapper'
import { Component } from '../utils/Component'

export function Router() {
	return (
		<Routes>
			<Route path='/' element={<Component name='Home' />} />
			<Route
				path='/categories/:category'
				element={
					<PrivateRoute>
						<CategoriesWrapper />
					</PrivateRoute>
				}
			/>
			<Route
				path='/categories/:category/:id'
				element={
					<PrivateRoute>
						<DetailsWrapper />
					</PrivateRoute>
				}
			/>
			<Route path='/login' element={<Component name='Login' />} />
			<Route path='*' element={<Component name='NotFound' />} />
		</Routes>
	)
}
