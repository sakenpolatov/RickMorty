import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../../assets/images/rick.svg'
import styles from './header.module.css'

export function Header() {
	return (
		<header>
			<div className={styles.logo}>
				<Link to='/'>
					<img src={icon} alt='Icon' width={100} height={100} />
				</Link>
			</div>
			<div className={styles.nav}>
				<ul>
					<li>
						<Link to='/characters'>Characters</Link>
					</li>
					<li>
						<Link to='/locations'>Locations</Link>
					</li>
					<li>
						<Link to='/episodes'>Episodes</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}
