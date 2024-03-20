import React, { useState, useEffect } from 'react'
import styles from './categories.module.css'
import { useParams, Link } from 'react-router-dom'
import charactersData from '../../assets/data/characters.json'
import locationData from '../../assets/data/locations.json'
import episodeData from '../../assets/data/episodes.json'

export function Categories() {
	const { category } = useParams()
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				let categoryData = []

				if (category === 'characters') {
					categoryData = charactersData
				} else if (category === 'locations') {
					categoryData = locationData
				} else if (category === 'episodes') {
					categoryData = episodeData
				}

				setData(categoryData)
				setIsLoading(false)
			} catch (error) {
				console.error('Ошибка получения данных:', error)
				setIsLoading(false)
			}
		}

		fetchData()
	}, [category])

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className={styles.list}>
					<ul className={styles.categories}>
						{data.map(item => (
							<li key={item.id}>
								<Link to={`/${category}/${item.id}`}>{item.name}</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
