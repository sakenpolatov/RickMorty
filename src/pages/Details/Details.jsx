import { useState, useEffect, useTransition } from 'react'
import styles from './details.module.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading/Loading'
import { DetailsInfo } from './DetailsInfo'

const ErrorMessage = 'Ошибка получения данных:'
const BASE_API = `https://rickandmortyapi.com/api`

export function Details() {
	const navigate = useNavigate()
	const { category, id } = useParams()
	const [details, setDetails] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		startTransition(() => {
			setIsLoading(true)
			try {
				axios
					.get(`${BASE_API}/${category}/${id}`)
					.then(response => {
						setDetails(response.data)
					})
					.catch(error => {
						console.error(ErrorMessage, error)
						navigate('/notfound')
					})
					.finally(() => {
						setIsLoading(false)
					})
			} catch (error) {
				console.error(ErrorMessage, error)
				setIsLoading(false)
			}
		})
	}, [category, id, navigate, startTransition])

	return (
		<div className={styles.details}>
			{isPending || isLoading ? (
				<Loading />
			) : (
				<DetailsInfo details={details} category={category} id={id} />
			)}
		</div>
	)
}
