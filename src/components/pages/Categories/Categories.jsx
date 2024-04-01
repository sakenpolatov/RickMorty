import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./categories.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loading } from "../../Loading/Loading";
import { useGetData } from "../../../hooks/useGetData";

export function Categories() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, hasMore, isPending } = useGetData(pageNumber);

  const observer = useRef();
  const lastNodeRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("VISIBLE");
          setPageNumber((prevState) => prevState + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
      console.log("###node###", node);
    },
    [isLoading, hasMore]
  );

  if (!["character", "episode", "location"].includes(category)) {
    navigate("/notfound");
  }

  return (
    <div>
      {isPending || isLoading ? (
        <Loading />
      ) : (
        <div className={styles.list}>
          <div>
            <ul className={styles.categories}>
              {data.map((item, index) =>
                data.length - 20 === index + 1 ? (
                  <li ref={lastNodeRef} key={`${category}-${item.id}`}>
                    <Link to={`/categories/${category}/${item.id}`}>
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  <li key={`${category}-${item.id}`}>
                    <Link to={`/categories/${category}/${item.id}`}>
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
