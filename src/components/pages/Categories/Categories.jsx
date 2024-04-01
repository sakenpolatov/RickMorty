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
      if (isLoading || isPending) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        console.log("VISIBLE");
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevState) => prevState + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
      console.log("###node###", node);
    },
    [isLoading, isPending, hasMore]
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
              {data.map((item, index) => (
                <li key={item.id}>
                  <Link to={`/categories/${category}/${item.id}`}>
                    {item.name}
                  </Link>
                  {index === data.length - 1 ? <div ref={lastNodeRef} /> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
