import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import styles from './categories.module.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData.js';
import { ItemInterface, SortType } from '../../types/types';
import { Loader, ScrollArea } from '@mantine/core';
import { Selector } from '../../components/Selector';

const sortList: SortType[] = [SortType.Default, SortType.A_Z, SortType.Z_A];

const INITIAL_PAGE: number = 1;

export function Categories() {
  const navigate = useNavigate();
  const { category = '' } = useParams();
  const [pageNumber, setPageNumber] = useState<number>(INITIAL_PAGE);
  const { isLoading, data, hasMore, isPending } = useGetData(pageNumber);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastNodeRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevState) => prevState + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore],
  );

  useEffect(() => {
    if (!['character', 'episode', 'location'].includes(category)) {
      navigate('/notfound');
    }
  }, [category, navigate]);

  const sortedData = useMemo(() => {
    if (sortType === SortType.Default) {
      return data;
    }
    let sorted = [...data];
    if (sortType === SortType.A_Z) {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === SortType.Z_A) {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sorted;
  }, [data, sortType]);

  useEffect(() => {
    setPageNumber(1);
  }, [category]);

  const sortedDataList = (
    <div className={styles.scrollContainer}>
      <ScrollArea
        h={650}
        type="auto"
        scrollbarSize={20}
        scrollHideDelay={6000}
        className={styles.scrollArea}
      >
        <ul className={styles.categories}>
          {sortedData.map((item: ItemInterface, index: number) =>
            sortedData.length - 16 === index + 1 ? (
              <li ref={lastNodeRef} key={item.id + Math.random() * 1000}>
                <Link to={`/categories/${category}/${item.id}`}>
                  {item.name}
                </Link>
              </li>
            ) : (
              <li key={item.id + Math.random() * 1000}>
                <Link to={`/categories/${category}/${item.id}`}>
                  {item.name}
                </Link>
              </li>
            ),
          )}
        </ul>
      </ScrollArea>
    </div>
  );

  return (
    <div className={styles.content}>
      <div className={styles.list}>
        <div className={styles.sort}>
          <Selector
            sortType={sortType}
            onChangeSort={setSortType}
            sortList={sortList}
          />
        </div>
        {!sortedData.length && (isPending || isLoading) ? (
          <Loader color="teal" />
        ) : (
          sortedDataList
        )}
      </div>
    </div>
  );
}
