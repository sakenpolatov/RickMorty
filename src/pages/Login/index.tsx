import { ChangeEvent, useState, FormEvent } from 'react'
import styles from './index.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider/index'
import { validateInput } from './../../utils/validate'
import { ErrorMessage } from '../../constants/errorMessages'

export const Login: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const auth = useAuth()

	const [username, setUsername] = useState<string>('')
	const [error, setError] = useState<string>('')

	const from = location.state?.from || '/'

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!validateInput(username)) {
			setError(ErrorMessage.validateMessage)
			return
		}

		auth.signIn(username, () => {
			navigate(from, { replace: true })
		})
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setUsername(value)

		if (value.trim() === '') {
			setError('')
		} else if (!validateInput(value)) {
			setError(ErrorMessage.validateMessage)
		} else {
			setError('')
		}
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

				<button className={styles.loginButton} type='submit' disabled={!!error}>
					Sign In
				</button>
				{error && <p className={styles.error}>{error}</p>}
			</form>
		</div>
	)
}
