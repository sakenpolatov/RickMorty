import React, { Suspense, lazy } from 'react'
import { Loading } from '../components/Loading/Loading'

const ComponentName = name => {
	return lazy(() =>
		import(`../components/pages/${name}/${name}`).then(module => ({
			default: module[name]
		}))
	)
}

export function Component(props) {
	const Component = ComponentName(props.name)
	return (
		<Suspense fallback={<Loading />}>
			<Component {...props} />
		</Suspense>
	)
}
