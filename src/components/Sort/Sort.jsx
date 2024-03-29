import React, { useState } from 'react'
import styles from './sort.module.css'

export function Sort({ sortType, onChangeSort }) {
	const [open, setOpen] = useState(false)
	const list = [{ name: 'default' }, { name: 'a-z' }, { name: 'z-a' }]

	const onClickListItem = name => {
		const newSortType = list.find(item => item.name === name)
		onChangeSort(newSortType)
		setOpen(false)
	}

	return (
		<div className={styles.sort}>
			<div className={styles.sort__label}>
				<b>Sort by:</b>
				<span onClick={() => setOpen(!open)}>{sortType.name}</span>
			</div>
			{open && (
				<div className={styles.sort__popup}>
					<ul>
						{list.map(item => (
							<li
								key={item.name}
								onClick={() => onClickListItem(item.name)}
								className={sortType.name === item.name ? styles.active : ''}
							>
								{item.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
