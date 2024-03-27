import React, { lazy, Suspense } from 'react'
import { Loading } from '../../Loading/Loading'

const Categories = lazy(() =>
	import('./Categories').then(module => ({
		default: module.Categories
	}))
)

export const CategoriesWrapper = () => (
	<Suspense fallback={<Loading />}>
		<Categories />
	</Suspense>
)
