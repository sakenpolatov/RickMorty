import styles from './details.module.css'

export function DetailsInfo({ details, category }) {
	return (
		<div className={styles.content}>
			{details ? (
				<>
					<h2>{details.name}</h2>
					{category === 'character' && (
						<div className={styles.characters}>
							<div>
								<img
									className={styles.img}
									src={details.image}
									alt={details.name}
								/>
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
					)}
					{category === 'episode' && (
						<div className={styles.episodes}>
							<p>
								Air Date: <u>{details.air_date}</u>
							</p>
							<p>
								Season-Episode: <u>{details.episode}</u>
							</p>
							<p>
								Created date: <u>{details.created}</u>
							</p>
						</div>
					)}
					{category === 'location' && (
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
