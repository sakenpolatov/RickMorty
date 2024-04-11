import { Link } from 'react-router-dom';
import icon from '../../assets/rick.svg';
import styles from './index.module.css';
import { AuthStatus } from '../../context/AuthStatus/index';
import { PathList } from './PathList';

export function Header() {
  return (
    <header>
      <div className={styles.logo}>
        <Link to={PathList.Home}>
          <img src={icon} alt="Home" width={100} height={100} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to={PathList.Character}>Characters</Link>
          </li>
          <li>
            <Link to={PathList.Location}>Locations</Link>
          </li>
          <li>
            <Link to={PathList.Episode}>Episodes</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.auth}>
        <AuthStatus />
      </div>
    </header>
  );
}
