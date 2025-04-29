import { lazy, LazyExoticComponent, FC } from 'react'

const Login: LazyExoticComponent<FC> = lazy(() =>
	import('./index').then(module => ({
		default: module.Login
	}))
)

export default Login
