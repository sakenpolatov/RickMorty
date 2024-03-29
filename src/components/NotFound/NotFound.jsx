import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './notfound.module.css'

export function NotFound() {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate('/')
		}, 1500)
	}, [])

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>404 - Page Not Found</h1>
		</div>
	)
}
