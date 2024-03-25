// Router.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Categories } from '../Categories/Categories'
import { Details } from '../Details/Details'
import { NotFound } from '../NotFound/NotFound'

export function Router() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/categories/:category' element={<Categories />} />
				<Route path='/categories/:category/:id' element={<Details />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}
