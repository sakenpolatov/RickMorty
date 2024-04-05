import { Link } from 'react-router-dom'
import icon from '../../assets/rick.svg'
import styles from './index.module.css'
import { AuthStatus } from '../../context/AuthStatus'

const PATH_LIST = {
	characters: '/categories/character',
	locations: '/categories/location',
	episodes: '/categories/episode'
}

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
						<Link to={PATH_LIST.characters}>Characters</Link>
					</li>
					<li>
						<Link to={PATH_LIST.locations}>Locations</Link>
					</li>
					<li>
						<Link to={PATH_LIST.episodes}>Episodes</Link>
					</li>
				</ul>
			</div>
			<div className={styles.auth}>
				<AuthStatus />
			</div>
		</header>
	)
}
