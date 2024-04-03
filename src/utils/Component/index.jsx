import { Suspense, lazy } from 'react'
import { Loading } from '../../components/Loading/Loading'

const ComponentName = name => {
	return /*#__PURE__*/ lazy(() =>
		/* @vite-ignore */ import(`./../../pages/${name}/${name}`).then(module => ({
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
