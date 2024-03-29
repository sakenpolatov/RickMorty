import React from 'react'
import { Header } from './components/Header/Header.jsx'
import { Router } from './components/Router/Router.jsx'
import styles from './app.module.css'

function App() {
	return (
		<div className={styles.app}>
			<Header />
			<Router />
		</div>
	)
}

export default App
