import { useEffect, useState, useTransition, useMemo } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const BASE_API = `https://rickandmortyapi.com/api`

export function useGetData(pageNumber) {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState([])
	const [hasMore, setHasMore] = useState(false)

	const [isPending, startTransition] = useTransition()
	const { category } = useParams()

	const getDataParams = useMemo(
		() => ({ category, pageNumber }),
		[category, pageNumber]
	)

	useEffect(() => {
		startTransition(() => {
			setIsLoading(true)
			axios({
				method: 'GET',
				url: `${BASE_API}/${getDataParams.category}`,
				params: {
					page: getDataParams.pageNumber
				}
			})
				.then(res => {
					let categoryData = []
					if (
						getDataParams.category === 'character' ||
						getDataParams.category === 'location' ||
						getDataParams.category === 'episode'
					) {
						categoryData = res.data.results
					} else {
						categoryData = res.data
					}
					setData(prevData => {
						return [...new Set([...prevData, ...categoryData])]
					})
					setHasMore(categoryData.length > 0)
					setIsLoading(false)
				})
				.catch(error => {
					console.error('Error:', error.message)
				})
		})
	}, [getDataParams])

	useEffect(() => {
		setData([])
	}, [category])

	return { isLoading, data, hasMore, isPending }
}
