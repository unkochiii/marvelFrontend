import axios from "axios";
import { useState, useEffect } from "react";
import getImageUrl from "../../assets/utils/getImgaeUrl";
import "./heros.css";

const Heros = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://site--marvelbackend--t4nqvl4d28d8.code.run/characters"
        );
        console.log(response.data);
        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container heros">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <main>
          {data.results.map((character) => {
            return (
              <article key={character._id}>
                <p>{character.name}</p>
                <p>{character.description}</p>
                <img src={getImageUrl(character.thumbnail)} alt="" />
              </article>
            );
          })}
        </main>
      )}
    </div>
  );
};

export default Heros;
