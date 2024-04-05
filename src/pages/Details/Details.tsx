import { useState, useEffect, useTransition } from 'react'
import styles from './details.module.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading/index'
import { DetailsInfo } from './DetailsInfo'

const ErrorMessage: string = 'Ошибка получения данных:'
const BASE_API: string = `https://rickandmortyapi.com/api`

export interface CharacterDetails {
	name: string
	image: string
	species: string
	status: string
	type?: string
	gender: string
	created: string
}

export interface EpisodeDetails {
	name: string
	air_date: string
	episode: string
	created: string
}

export interface LocationDetails {
	name: string
	type: string
	dimension: string
	created: string
}

export enum Category {
	Character = 'character',
	Episode = 'episode',
	Location = 'location'
}
export type Details = CharacterDetails | EpisodeDetails | LocationDetails

export function Details() {
	const navigate = useNavigate()
	const { category, id } = useParams<{ category: Category; id: string }>()
	const [details, setDetails] = useState<Details | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		if (category && id) {
			startTransition(() => {
				setIsLoading(true)
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
			})
		}
	}, [category, id, navigate, startTransition])

	return (
		<div className={styles.details}>
			{isPending || isLoading ? (
				<Loading />
			) : (
				category &&
				id && <DetailsInfo details={details} category={category} id={id} />
			)}
		</div>
	)
}
