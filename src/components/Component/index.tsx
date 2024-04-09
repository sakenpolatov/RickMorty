import { Suspense, ReactNode, ComponentType } from 'react'
import { Loading } from '../Loading/index'

interface ComponentProps {
	component: ComponentType
	fallback?: ReactNode | JSX.Element
	[key: string]: unknown
}

export function ComponentWithSuspense({
	component: Component,
	fallback = <Loading />,
	...otherProps
}: ComponentProps) {
	return (
		<Suspense fallback={fallback}>
			<Component {...otherProps} />
		</Suspense>
	)
}
