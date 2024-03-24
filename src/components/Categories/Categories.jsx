// Categories.js
import React, { useState, useEffect, useMemo } from 'react'
import styles from './categories.module.css'
import { useParams, Link } from 'react-router-dom'
import { Loading } from '../Loading/Loading'
import { NotFound } from '../NotFound/NotFound'
import { Sort } from '../Sort/Sort'

export function Categories() {
	const initialSort = {
		name: 'default'
	}
	const { category } = useParams()
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [sortType, setSortType] = useState(initialSort)

	const urlData = `https://65faa45d3909a9a65b1affc6.mockapi.io/rickandmorty/data`

	useEffect(() => {
		setIsLoading(true)
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const response = await fetch(urlData)
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

	const sortedData = useMemo(() => {
		if (sortType.name === 'default') {
			return data
		}

		let sorted = [...data]
		sorted.sort((a, b) => {
			if (sortType.name === 'a-z') {
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
			} else if (sortType.name === 'z-a') {
				return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
			}
			return 0
		})

		return sorted
	}, [sortType, data])

	if (!['characters', 'episodes', 'locations'].includes(category)) {
		return <NotFound />
	}

	return (
		<div>
			{isLoading ? (
				<Loading />
			) : (
				<div className={styles.list}>
					<div className={styles.sort}>
						<Sort sortType={sortType} onChangeSort={setSortType} />
					</div>
					<div>
						<ul className={styles.categories}>
							{sortedData.map(item => (
								<li key={item.id}>
									<Link to={`/${category}/${item.id}`}>{item.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
			{console.log(sortedData)}
		</div>
	)
}
