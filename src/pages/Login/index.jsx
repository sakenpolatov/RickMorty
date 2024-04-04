import { useState } from 'react'
import styles from './index.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

const ErrorMessage = `Имя пользователя должно содержать только латинские буквы, одну заглавную .Не менее 4 символов. Запретные символы (!@#$%^&*_-=)`

export function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const auth = useAuth()

	const [username, setUsername] = useState('')
	const [error, setError] = useState('')

	const from = location.state?.from || '/'

	const handleSubmit = event => {
		event.preventDefault()

		if (!validateInput(username)) {
			setError(ErrorMessage)
			return
		}

		auth.signIn(username, () => {
			navigate(from, { replace: true })
		})
	}

	const handleInputChange = event => {
		const value = event.target.value
		setUsername(value)

		if (value.trim() === '') {
			setError('')
		} else if (!validateInput(value)) {
			setError(ErrorMessage)
		} else {
			setError('')
		}
	}

	const validateInput = value => {
		return (
			value.trim().length >= 4 &&
			/^[a-zA-Z]+$/.test(value) &&
			/[A-Z]/.test(value)
		)
	}

	return (
		<div className={styles.loginContainer}>
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<label className={styles.loginLabel}>
					Username:{'     '}
					<input
						className={styles.loginInput}
						type='text'
						name='username'
						value={username}
						onChange={handleInputChange}
					/>
				</label>

				<button className={styles.loginButton} type='submit' disabled={error}>
					Sign In
				</button>
				{error && <p className={styles.error}>{error}</p>}
			</form>
		</div>
	)
}
