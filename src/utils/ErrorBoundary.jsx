import { Component } from 'react'

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		console.log(error.message)
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.log(error.message)
		console.log(errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <h3>Ошибка получения данных</h3>
		}
		return this.props.children
	}
}

export default ErrorBoundary
