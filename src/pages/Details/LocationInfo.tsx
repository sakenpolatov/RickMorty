import { LocationDetails } from './Details'
import styles from './details.module.css'

interface LocationInfoProps {
	details: LocationDetails
}

export function LocationInfo({ details }: LocationInfoProps) {
	return (
		<div className={styles.locations}>
			<p>
				Type: <u>{details.type}</u>
			</p>
			<p>
				Dimension: <u>{details.dimension}</u>
			</p>
			<p>
				Created date: <u>{details.created}</u>
			</p>
		</div>
	)
}
