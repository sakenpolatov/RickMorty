import React, { useState } from 'react'
import styles from './sort.module.css'

export function Sort({ value, onChangeSort }) {
	const [open, setOpen] = useState(false)
	const list = [
		{ name: 'default', sortProperty: 'default' },
		{ name: 'a-z', sortProperty: 'title' },
		{ name: 'z-a', sortProperty: '-title' }
	]

	const onClickListItem = i => {
		onChangeSort(i)
		setOpen(false)
	}

	return (
		<div className={styles.sort}>
			<div className={styles.sort__label}>
				<b>Sort by:</b>
				<span onClick={() => setOpen(!open)}>{value.name}</span>
			</div>
			{open && (
				<div className={styles.sort__popup}>
					<ul>
						{list.map(obj => (
							<li
								key={obj.i}
								onClick={() => onClickListItem(obj)}
								className={
									value.sortProperty === obj.sortProperty ? styles.active : ''
								}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
