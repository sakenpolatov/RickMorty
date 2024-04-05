import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

export const NotFound: React.FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/')
		}, 1500)

		return () => clearTimeout(timer)
	}, [navigate])

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>404 - Page Not Found</h1>
		</div>
	)
}
