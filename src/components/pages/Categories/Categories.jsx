import React, { useState, useEffect, useMemo, useTransition } from "react";
import styles from "./categories.module.css";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loading } from "../../Loading/Loading";
import { Sort } from "../../Sort/Sort";

export function Categories() {
  const navigate = useNavigate();
  const initialSort = {
    name: "default",
  };
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState(initialSort);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setIsLoading(true);
      try {
        axios({
          method: "GET",
          url: `https://rickandmortyapi.com/api/${category}`,
          params: { page: 1 },
        })
          .then((response) => {
            const jsonData = response.data;
            let categoryData = [];
            if (
              category === "character" ||
              category === "location" ||
              category === "episode"
            ) {
              categoryData = jsonData.results;
            } else {
              categoryData = jsonData;
            }
            setData(categoryData);
          })
          .catch((error) => {
            console.error("Ошибка получения данных:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.error("Ошибка получения данных:", error);
        setIsLoading(false);
      }
    });
  }, [category, startTransition]);

  const sortedData = useMemo(() => {
    if (sortType.name === "default") {
      return data;
    }

    let sorted = [...data];
    sorted.sort((a, b) => {
      if (sortType.name === "a-z") {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      } else if (sortType.name === "z-a") {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      }
      return 0;
    });

    return sorted;
  }, [sortType, data]);

  if (!["character", "episode", "location"].includes(category)) {
    navigate("/notfound");
  }

  return (
    <div>
      {isPending || isLoading ? (
        <Loading />
      ) : (
        <div className={styles.list}>
          <div className={styles.sort}>
            <Sort sortType={sortType} onChangeSort={setSortType} />
          </div>
          <div>
            <ul className={styles.categories}>
              {sortedData.map((item) => (
                <li key={item.id}>
                  <Link to={`/categories/${category}/${item.id}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
