import { IEpisodeDetails } from '../../types/types';
import styles from './details.module.css';

interface EpisodeInfoProps {
  details: IEpisodeDetails;
}

export function EpisodeInfo({ details }: EpisodeInfoProps) {
  return (
    <div className={styles.episodes}>
      <p>
        Air Date: <u>{details.air_date}</u>
      </p>
      <p>
        Season-Episode: <u>{details.episode}</u>
      </p>
      <p>
        Created date: <u>{details.created}</u>
      </p>
    </div>
  );
}
