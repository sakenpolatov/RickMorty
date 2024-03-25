import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../../assets/images/rick.svg'
import styles from './header.module.css'
import { AuthStatus } from '../../context/AuthStatus/AuthStatus'

export function Header() {
	return (
		<header>
			<div className={styles.logo}>
				<Link to='/'>
					<img src={icon} alt='Home' width={100} height={100} />
				</Link>
			</div>
			<div className={styles.nav}>
				<ul>
					<li>
						<Link to='/categories/characters'>Characters</Link>
					</li>
					<li>
						<Link to='/categories/locations'>Locations</Link>
					</li>
					<li>
						<Link to='/categories/episodes'>Episodes</Link>
					</li>
				</ul>
			</div>
			<div className={styles.auth}>
				<AuthStatus />
			</div>
		</header>
	)
}
