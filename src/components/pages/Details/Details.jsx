import styles from './details.module.css'
import React, { useState, useEffect, useTransition } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../../Loading/Loading'

export function Details() {
	const { category, id } = useParams()
	const [details, setDetails] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		startTransition(() => {
			const fetchData = async () => {
				setIsLoading(true)

				try {
					const response = await fetch(
						`https://65faa45d3909a9a65b1affc6.mockapi.io/rickandmorty/data`
					)

					if (!response.ok) {
						throw new Error('Ошибка получения данных')
					}

					const jsonData = await response.json()

					if (!Array.isArray(jsonData) || jsonData.length !== 3) {
						throw new Error('Неверная структура данных')
					}

					let categoryData = null

					if (category === 'characters') {
						categoryData = jsonData[0]
					} else if (category === 'locations') {
						categoryData = jsonData[1]
					} else if (category === 'episodes') {
						categoryData = jsonData[2]
					}

					if (categoryData) {
						const item = categoryData.find(item => item.id === parseInt(id))
						if (item) {
							setDetails(item)
						} else {
							throw new Error(
								`Элемент с таким id ${id} не найден в категории ${category} в базе`
							)
						}
					} else {
						throw new Error(`Данные в категории ${category} не найдены в базе`)
					}
				} catch (error) {
					console.error('Ошибка получения данных:', error)
				} finally {
					setIsLoading(false)
				}
			}

			fetchData()
		})
	}, [category, id, startTransition])

	return (
		<div className={styles.details}>
			{isPending || isLoading ? (
				<Loading />
			) : (
				<div className={styles.content}>
					{details ? (
						<>
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
						</>
					) : (
						<div className={styles.episodes}>
							<p>Item not found.</p>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
