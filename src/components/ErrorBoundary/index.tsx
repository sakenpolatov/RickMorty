import { Component, ReactNode, ErrorInfo } from 'react'
import { ErrorMessage } from '../../constants/errorMessages'
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
		console.error(ErrorMessage.errorDidCatch, error.message)
		console.error(ErrorMessage.errorDidCatchInFo, errorInfo)
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return <h3>{ErrorMessage.dataCatchError}</h3>
		}
		return this.props.children
	}
}

export default ErrorBoundary
