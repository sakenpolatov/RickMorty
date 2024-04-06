import { lazy, LazyExoticComponent, FC } from 'react'

const Home: LazyExoticComponent<FC> = lazy(() =>
	import('./index').then(module => ({
		default: module.Home
	}))
)

export default Home
