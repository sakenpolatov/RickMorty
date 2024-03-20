import React, { useState, useEffect } from 'react'
import styles from './details.module.css'
import { useParams } from 'react-router-dom'
import charactersData from '../../assets/data/characters.json'
import episodesData from '../../assets/data/episodes.json'
import locationsData from '../../assets/data/locations.json'

export function Details() {
	const { category, id } = useParams()
	const [details, setDetails] = useState(null)

	useEffect(() => {
		const dataMap = {
			characters: charactersData,
			episodes: episodesData,
			locations: locationsData
		}

		const fetchData = () => {
			const data =
				dataMap[category].find(item => item.id === parseInt(id)) || null
			setDetails(data)
		}

		fetchData()
	}, [category, id])

	return (
		<div className={styles.details}>
			{details ? (
				<div className={styles.content}>
					<h2>{details.name}</h2>
					{category === 'characters' && (
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
									Status: <u>{details.status}</u>
								</p>
								<p>
									Species: <u>{details.species}</u>
								</p>
								<p>
									Gender: <u>{details.gender}</u>
								</p>
								<p>
									Created date: <u>{details.created}</u>
								</p>
							</div>
						</div>
					)}
					{category === 'episodes' && (
						<div className={styles.episodes}>
							<p>
								Air Date:<u> {details.air_date}</u>
							</p>
							<p>
								Season-Episode: <u>{details.episode}</u>
							</p>
							<p>
								Created date: <u>{details.created}</u>
							</p>
						</div>
					)}
					{category === 'locations' && (
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
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}
