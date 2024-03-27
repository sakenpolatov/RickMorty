import React, { Suspense } from 'react'
import { Header } from './components/Header/Header.jsx'
import { Router } from './components/Router/Router.jsx'
import styles from './app.module.css'
import { AuthProvider } from './context/AuthProvider/AuthProvider.jsx'
import { Loading } from './components/Loading/Loading.jsx'

function App() {
	return (
		<div className={styles.app}>
			<AuthProvider>
				<Header />
				<Suspense fallback={<Loading />}>
					<Router />
				</Suspense>
			</AuthProvider>
		</div>
	)
}

export default App
