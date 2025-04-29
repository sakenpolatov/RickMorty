import { lazy, LazyExoticComponent, FC } from 'react'

const Details: LazyExoticComponent<FC> = lazy(() =>
	import('./Details').then(module => ({
		default: module.Details
	}))
)

export default Details
