import styles from './details.module.css';
import { CharacterInfo } from './CharacterInfo';
import { LocationInfo } from './LocationInfo';
import { EpisodeInfo } from './EpisodeInfo';
import {
  ICharacterDetails,
  IEpisodeDetails,
  ILocationDetails,
  ECategory,
} from '../../types/types';

interface DetailsInfoProps {
  details: ICharacterDetails | IEpisodeDetails | ILocationDetails | null;
  category: ECategory;
  id: string;
}

export function DetailsInfo({ details, category }: DetailsInfoProps) {
  return (
    <div className={styles.content}>
      {details ? (
        <>
          <h2>{details.name}</h2>
          {category === ECategory.Character && (
            <CharacterInfo details={details as ICharacterDetails} />
          )}
          {category === ECategory.Episode && (
            <LocationInfo details={details as ILocationDetails} />
          )}
          {category === ECategory.Location && (
            <EpisodeInfo details={details as IEpisodeDetails} />
          )}
        </>
      ) : (
        <div className={styles.episodes}>
          <p>Item not found.</p>
        </div>
      )}
    </div>
  );
}
