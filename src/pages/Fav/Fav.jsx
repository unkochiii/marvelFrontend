// src/pages/Fav/Fav.jsx
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./fav.css";

const Fav = ({ favorites = [], removeFavorite }) => {
  // Vérification de la liste vide
  if (favorites.length === 0) {
    return (
      <div className="container">
        <div className="empty-favorites">
          <h1>Mes Favoris</h1>
          <p>Vous n'avez pas encore de favoris.</p>
        </div>
      </div>
    );
  }

  // Fonction pour obtenir l'URL de l'image de manière sécurisée
  const getImageUrl = (item) => {
    if (item.thumbnail?.path && item.thumbnail?.extension) {
      return `${item.thumbnail.path}.${item.thumbnail.extension}`;
    }
    return "/placeholder-image.jpg"; // Image par défaut
  };

  // Fonction pour obtenir le chemin de navigation
  const getItemPath = (item) => {
    return item.name ? `/character/${item._id}` : `/comic/${item._id}`;
  };

  return (
    <div className="container">
      <h1>Mes Favoris ({favorites.length})</h1>
      <div className="favorites-grid">
        {favorites.map((item) => (
          <article key={item._id} className="favorite-card">
            <button
              className="remove-btn"
              onClick={() => removeFavorite(item._id)}
              title="Retirer des favoris"
              aria-label={`Retirer ${item.name || item.title} des favoris`}
            >
              ✕
            </button>

            <Link to={getItemPath(item)} className="favorite-link">
              <img
                src={getImageUrl(item)}
                alt={item.name || item.title || "Image du favori"}
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
              <h3>{item.name || item.title || "Sans titre"}</h3>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

// Validation des props
Fav.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
      thumbnail: PropTypes.shape({
        path: PropTypes.string,
        extension: PropTypes.string,
      }),
    })
  ),
  removeFavorite: PropTypes.func.isRequired,
};

export default Fav;
