import { Suspense } from 'react'
import { Header } from './components/Header/index'
import { Router } from './Router/index'
import styles from './app.module.css'
import { AuthProvider } from './context/AuthProvider'
import { Loading } from './components/Loading/index'
import ErrorBoundary from './components/ErrorBoundary/index'

const App = () => {
	return (
		<div className={styles.app}>
			<AuthProvider>
				<Header />
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<Router />
					</Suspense>
				</ErrorBoundary>
			</AuthProvider>
		</div>
	)
}

export default App
