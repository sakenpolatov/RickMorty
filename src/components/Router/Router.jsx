import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Categories } from '../Categories/Categories'
import { Details } from '../Details/Details'
import { NotFound } from '../NotFound/NotFound'
import { Login } from '../Login/Login'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'

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
