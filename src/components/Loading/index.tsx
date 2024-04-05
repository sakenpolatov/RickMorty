import styles from './index.module.css'

export function Loading() {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loader}></div>
			<p>Loading...</p>
		</div>
	)
}
