import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'
import { CategoriesWrapper } from '../pages/Categories/CategoriesWrapper'
import { DetailsWrapper } from '../pages/Details/DetailsWrapper'

const Home = lazy(() =>
	import('../pages/Home/Home').then(module => ({
		default: module.Home
	}))
)

const Login = lazy(() =>
	import('../Login/Login').then(module => ({
		default: module.Login
	}))
)
const NotFound = lazy(() =>
	import('../pages/NotFound/NotFound').then(module => ({
		default: module.NotFound
	}))
)

export function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
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
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
