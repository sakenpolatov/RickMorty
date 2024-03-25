import React from 'react'
import { Header } from './components/Header/Header.jsx'
import { Router } from './components/Router/Router.jsx'
import styles from './app.module.css'
import { AuthProvider } from './context/AuthProvider/AuthProvider.jsx'

function App() {
	return (
		<div className={styles.app}>
			<AuthProvider>
				<Header />
				<Router />
			</AuthProvider>
		</div>
	)
}

export default App
