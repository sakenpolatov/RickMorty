export const validateInput = (value: string): boolean => {
	return (
		value.trim().length >= 4 && /^[a-zA-Z]+$/.test(value) && /[A-Z]/.test(value)
	)
}
