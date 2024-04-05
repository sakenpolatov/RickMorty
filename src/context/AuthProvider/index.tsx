import { createContext, useContext, useState } from 'react'

interface AuthContextType {
	user: string | null
	signIn: (newUser: string, callback: () => void) => void
	signOut: (callback: () => void) => void
}
const ERROR_MESSAGE = 'Ошибка авторизации'

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error(ERROR_MESSAGE)
	}
	return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<string | null>(() => {
		return localStorage.getItem('user')
	})

	const signIn = (newUser: string, callback: () => void) => {
		setUser(newUser)
		localStorage.setItem('user', newUser)
		callback()
	}
	const signOut = (callback: () => void) => {
		setUser(null)
		localStorage.removeItem('user')
		callback()
	}

	const value: AuthContextType = {
		user,
		signIn,
		signOut
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
