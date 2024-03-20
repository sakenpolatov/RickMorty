import React, { useState, useEffect } from 'react'
import styles from './categories.module.css'
import { useParams, Link } from 'react-router-dom'
import { Loading } from '../Loading/Loading'
import { NotFound } from '../NotFound/NotFound'

export function Categories() {
	const { category } = useParams()
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const response = await fetch(
					'https://65faa45d3909a9a65b1affc6.mockapi.io/rickandmorty/data'
				)
				if (!response.ok) {
					throw new Error('Failed to fetch data')
				}
				const jsonData = await response.json()

				let categoryData = []
				if (category === 'characters') {
					categoryData = jsonData[0]
				} else if (category === 'locations') {
					categoryData = jsonData[1]
				} else if (category === 'episodes') {
					categoryData = jsonData[2]
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

	if (
		category !== 'characters' &&
		category !== 'episodes' &&
		category !== 'locations'
	) {
		return <NotFound />
	}

	return (
		<div>
			{isLoading ? (
				<Loading />
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
