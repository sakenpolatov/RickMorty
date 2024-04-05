import { lazy, Suspense } from 'react'
import { Loading } from '../../components/Loading/index'

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
