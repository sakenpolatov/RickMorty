import { lazy, LazyExoticComponent, FC } from 'react'

const Categories: LazyExoticComponent<FC> = lazy(() =>
	import('./Categories').then(module => ({
		default: module.Categories
	}))
)

export default Categories
