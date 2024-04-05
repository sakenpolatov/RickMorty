import { CharacterDetails } from './Details'
import styles from './details.module.css'

interface CharacterInfoProps {
	details: CharacterDetails
}

export const CharacterInfo = ({ details }: CharacterInfoProps) => {
	return (
		<div className={styles.characters}>
			<div>
				<img className={styles.img} src={details.image} alt={details.name} />
			</div>
			<div className={styles.info}>
				<p>
					Species: <u>{details.species}</u>
				</p>
				<p>
					Status: <u>{details.status}</u>
				</p>
				{details.type && (
					<p>
						Type: <u>{details.type}</u>
					</p>
				)}
				<p>
					Gender: <u>{details.gender}</u>
				</p>
				<p>
					Created date: <u>{details.created}</u>
				</p>
			</div>
		</div>
	)
}
