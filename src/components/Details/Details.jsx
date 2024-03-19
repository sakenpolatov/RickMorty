import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import charactersData from "../../assets/data/characters.json";
import episodesData from "../../assets/data/episodes.json";
import locationsData from "../../assets/data/locations.json";

export function Details() {
  const { category, id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const dataMap = {
      characters: charactersData,
      episodes: episodesData,
      locations: locationsData,
    };

    const fetchData = () => {
      const data =
        dataMap[category].find((item) => item.id === parseInt(id)) || null;
      setDetails(data);
    };

    fetchData();
  }, [category, id]);

  return (
    <div>
      {details ? (
        <div>
          <h2>{details.name}</h2>
          {category === "characters" && (
            <>
              <p>Status: {details.status}</p>
              <p>Species: {details.species}</p>
            </>
          )}
          {category === "episodes" && (
            <>
              <p>Air Date: {details.air_date}</p>
            </>
          )}
          {category === "locations" && (
            <>
              <p>Type: {details.type}</p>
              <p>Dimension: {details.dimension}</p>
            </>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
