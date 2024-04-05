import React from 'react'
import styles from './login.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthProvider/AuthProvider'

export function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const auth = useAuth()

	const from = location.state?.from || '/'

	const handleSubmit = event => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const userName = formData.get('username')

		auth.signIn(userName, () => {
			navigate(from, { replace: true })
		})
	}

	return (
		<div className={styles.loginContainer}>
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<label className={styles.loginLabel}>
					Username:{'            '}
					<input className={styles.loginInput} type='text' name='username' />
				</label>
				<button className={styles.loginButton} type='submit'>
					Log In
				</button>
			</form>
		</div>
	)
}
