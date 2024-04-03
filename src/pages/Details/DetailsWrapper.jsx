import { lazy, Suspense } from 'react'
import { Loading } from '../../components/Loading/Loading'

const Details = lazy(() =>
	import('./Details').then(module => ({
		default: module.Details
	}))
)

export const DetailsWrapper = () => (
	<Suspense fallback={<Loading />}>
		<Details />
	</Suspense>
)
