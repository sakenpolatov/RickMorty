import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'

const Home = lazy(() =>
	import('../pages/Home/Home').then(module => ({
		default: module.Home
	}))
)

const Categories = lazy(() =>
	import('../pages/Categories/Categories').then(module => ({
		default: module.Categories
	}))
)
const Details = lazy(() =>
	import('../pages/Details/Details').then(module => ({
		default: module.Details
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
						<Categories />
					</PrivateRoute>
				}
			/>
			<Route
				path='/categories/:category/:id'
				element={
					<PrivateRoute>
						<Details />
					</PrivateRoute>
				}
			/>
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
