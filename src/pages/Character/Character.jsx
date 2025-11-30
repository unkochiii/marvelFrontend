import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./character.css";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

const Character = ({ toggleFavorite, isFavorite }) => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]); // État séparé pour les comics
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setIsLoading(true);

        // 1. Récupérer les infos du personnage
        const response = await axios.get(
          `https://site--marvelbackend--t4nqvl4d28d8.code.run/character/${id}`
        );
        setCharacter(response.data);

        // 2. Récupérer les détails de chaque comic
        if (response.data.comics && response.data.comics.length > 0) {
          const comicsPromises = response.data.comics.map((comicId) =>
            axios.get(
              `https://site--marvelbackend--t4nqvl4d28d8.code.run/comic/${comicId}`
            )
          );

          const comicsResponses = await Promise.all(comicsPromises);
          const comicsData = comicsResponses.map((res) => res.data);
          setComics(comicsData);
        }

        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement du personnage");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="container character">
      {character && (
        <div className="character-detail">
          <h1>{character.name}</h1>
          <div className="details">
            {character.thumbnail && (
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="character-image"
              />
            )}

            {character.description && (
              <div className="description">
                <h2>Description</h2>
                <p>{character.description}</p>
              </div>
            )}
          </div>

          {comics.length > 0 && (
            <div className="comics-list">
              <h2>Apparitions dans les comics ({comics.length})</h2>
              <div className="comics-grid">
                {comics.map((comic) => (
                  <article key={comic._id} className="comic-card">
                    <h3>{comic.title}</h3>
                    {comic.thumbnail && (
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                    )}

                    {comic.description && (
                      <p className="comic-description">{comic.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Character;
