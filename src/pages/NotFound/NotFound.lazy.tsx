import { lazy, LazyExoticComponent, FC } from 'react'

const NotFound: LazyExoticComponent<FC> = lazy(() =>
	import('./index').then(module => ({
		default: module.NotFound
	}))
)

export default NotFound
