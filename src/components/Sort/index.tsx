import { useState } from 'react'
import styles from './index.module.css'
import { SortType } from '../../pages/Categories/Categories'

interface SortProps {
	sortType: string
	onChangeSort: React.Dispatch<React.SetStateAction<SortType>>
	sortList: string[]
}

export function Sort({ sortType, onChangeSort, sortList }: SortProps) {
	const [open, setOpen] = useState<boolean>(false)

	const onClickListItem = (name: string) => {
		onChangeSort(name as SortType)
		setOpen(false)
	}

	const listItems = sortList.map((item, index) => (
		<li
			key={index}
			onClick={() => onClickListItem(item)}
			className={sortType === item ? styles.active : ''}
		>
			{item}
		</li>
	))

	return (
		<div className={styles.sort}>
			<div className={styles.sort__label}>
				<b>Sort by:</b>
				<span onClick={() => setOpen(!open)}>{sortType}</span>
			</div>
			{open && (
				<div className={styles.sort__popup}>
					<ul>{listItems}</ul>
				</div>
			)}
		</div>
	)
}
