import { Suspense, lazy, ReactElement } from 'react'
import { Loading } from '../../components/Loading/index'

type ComponentType = (props: { name: string }) => ReactElement

type ComponentNameType = (
	name: string
) => Promise<{ default: React.ComponentType<any> }>

const ComponentName: ComponentNameType = (name: string) => {
	const componentPath = `../../pages/${name}/`
	return import(componentPath).then(module => ({ default: module[name] }))
}

export const Component: ComponentType = (props: { name: string }) => {
	const Component = lazy(() => ComponentName(props.name))
	return (
		<Suspense fallback={<Loading />}>
			<Component {...props} />
		</Suspense>
	)
}
