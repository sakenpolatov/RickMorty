import { useState, useEffect, useTransition } from 'react';
import styles from './details.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading/index';
import { DetailsInfo } from './DetailsInfo';
import { ErrorMessage } from '../../constants/errorMessages';
import { BASE_API } from '../../constants/BASE_API';
import { ECategory, TDetails } from '../../types/types';

export function Details() {
  const navigate = useNavigate();
  const { category, id } = useParams<{ category: ECategory; id: string }>();
  const [details, setDetails] = useState<TDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (category && id) {
      startTransition(() => {
        setIsLoading(true);
        axios
          .get(`${BASE_API}/${category}/${id}`)
          .then((response) => {
            setDetails(response.data);
          })
          .catch((error) => {
            console.error(ErrorMessage.errorDidCatch, error);
            navigate('/notfound');
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  }, [category, id, navigate, startTransition]);

  return (
    <div className={styles.details}>
      {isPending || isLoading ? (
        <Loading />
      ) : (
        category &&
        id && <DetailsInfo details={details} category={category} id={id} />
      )}
    </div>
  );
}
