import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { Categories } from './components/Categories/Categories.jsx'
import { Details } from './components/Details/Details.jsx'
import { NotFound } from './components/NotFound/NotFound.jsx'
import styles from './app.module.css'

function App() {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:categories' element={<Categories />} />
				<Route path='/:categories/:id' element={<Details />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
