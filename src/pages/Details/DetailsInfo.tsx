import styles from './details.module.css'
import { CharacterInfo } from './CharacterInfo'
import { LocationInfo } from './LocationInfo'
import { EpisodeInfo } from './EpisodeInfo'
import {
	CharacterDetails,
	EpisodeDetails,
	LocationDetails,
	Category
} from './Details'

interface DetailsInfoProps {
	details: CharacterDetails | EpisodeDetails | LocationDetails | null
	category: Category
	id: string
}

export function DetailsInfo({ details, category }: DetailsInfoProps) {
	return (
		<div className={styles.content}>
			{details ? (
				<>
					<h2>{details.name}</h2>
					{category === Category.Character && (
						<CharacterInfo details={details as CharacterDetails} />
					)}
					{category === Category.Episode && (
						<LocationInfo details={details as LocationDetails} />
					)}
					{category === Category.Location && (
						<EpisodeInfo details={details as EpisodeDetails} />
					)}
				</>
			) : (
				<div className={styles.episodes}>
					<p>Item not found.</p>
				</div>
			)}
		</div>
	)
}
