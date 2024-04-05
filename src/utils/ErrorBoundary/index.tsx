import { Component, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('Error:', error.message)
		console.error('Error Info:', errorInfo)
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return <h3>Ошибка получения данных</h3>
		}
		return this.props.children
	}
}

export default ErrorBoundary
