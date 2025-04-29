import { useEffect, useState, useTransition, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../constants/errorMessages';
import { BASE_API } from '../constants/BASE_API';
import { ItemInterface, ECategory, UseGetDataReturn } from '../types/types';

export function useGetData(pageNumber: number): UseGetDataReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ItemInterface[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();
  const { category } = useParams();

  const getDataParams = useMemo(
    () => ({ category, pageNumber }),
    [category, pageNumber],
  );

  useEffect(() => {
    startTransition(() => {
      setIsLoading(true);
      axios({
        method: 'GET',
        url: `${BASE_API}/${getDataParams.category}`,
        params: {
          page: getDataParams.pageNumber,
        },
      })
        .then((res) => {
          let categoryData = [];
          if (
            getDataParams.category === ECategory.Character ||
            getDataParams.category === ECategory.Location ||
            getDataParams.category === ECategory.Episode
          ) {
            categoryData = res.data.results;
          } else {
            categoryData = res.data;
          }
          setData((prevData) => {
            return [...new Set([...prevData, ...categoryData])];
          });
          setHasMore(categoryData.length > 0);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(ErrorMessage.errorDidCatch, error.message);
        });
    });
  }, [getDataParams]);

  useEffect(() => {
    setData([]);
  }, [category]);

  return { isLoading, data, hasMore, isPending };
}
