import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import styles from './categories.module.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Loading } from '../../Loading/Loading'
import { useGetData } from '../../../hooks/useGetData.jsx'
import { Sort } from '../../Sort/Sort'

const Default = 'default'
const AZsort = 'a-z'
const ZAsort = 'z-a'
const sortList = [Default, AZsort, ZAsort]

export function Categories() {
	const navigate = useNavigate()
	const { category } = useParams()
	const [pageNumber, setPageNumber] = useState(1)
	const { isLoading, data, hasMore, isPending } = useGetData(pageNumber)
	const [sortType, setSortType] = useState(Default)

	const observer = useRef()
	const lastNodeRef = useCallback(
		node => {
			if (isLoading) return
			if (observer.current) {
				observer.current.disconnect()
			}
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber(prevState => prevState + 1)
				}
			})
			if (node) {
				observer.current.observe(node)
			}
		},
		[isLoading, hasMore]
	)

	if (!['character', 'episode', 'location'].includes(category)) {
		navigate('/notfound')
	}

	const sortedData = useMemo(() => {
		if (sortType.name === Default) {
			return data
		}
		let sorted = [...data]
		if (sortType === AZsort) {
			sorted.sort((a, b) => a.name.localeCompare(b.name))
		} else if (sortType === ZAsort) {
			sorted.sort((a, b) => b.name.localeCompare(a.name))
		}
		return sorted
	}, [data, sortType])

	useEffect(() => {
		setPageNumber(1)
	}, [category])

	return (
		<div className={styles.content}>
			<div className={styles.list}>
				<div className={styles.sort}>
					<Sort
						sortType={sortType}
						onChangeSort={setSortType}
						sortList={sortList}
					/>
				</div>
				{!sortedData.length && (isPending || isLoading) ? (
					<Loading />
				) : (
					<ul className={styles.categories}>
						{sortedData.map((item, index) =>
							sortedData.length - 16 === index + 1 ? (
								<li ref={lastNodeRef} key={item.id}>
									<Link to={`/categories/${category}/${item.id}`}>
										{item.name}
									</Link>
								</li>
							) : (
								<li key={item.id}>
									<Link to={`/categories/${category}/${item.id}`}>
										{item.name}
									</Link>
								</li>
							)
						)}
					</ul>
				)}
			</div>
		</div>
	)
}
