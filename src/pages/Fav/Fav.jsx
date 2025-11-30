// src/pages/Fav/Fav.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import "./fav.css";
import Remove from "../../assets/images/circle-minus-solid-full.svg";

const Fav = () => {
  // 🔥 Plus besoin de props
  const { favorites, removeFavorite } = useFavorites(); // 🔥 Utiliser le context

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

  const getImageUrl = (item) => {
    if (item.thumbnail?.path && item.thumbnail?.extension) {
      return `${item.thumbnail.path}.${item.thumbnail.extension}`;
    }
    return "/placeholder-image.jpg";
  };

  const getItemPath = (item) => {
    return item.name ? `/character/${item._id}` : `/comic/${item._id}`;
  };

  return (
    <div className="container fav">
      <div className="favorites-grid">
        <h1>Mes Favoris ({favorites.length})</h1>
        {favorites.map((item) => (
          <article key={item._id} className="favorite-card">
            <button
              className="remove-btn"
              onClick={() => removeFavorite(item._id)}
              title="Retirer des favoris"
              aria-label={`Retirer ${item.name || item.title} des favoris`}
            >
              <img src={Remove} alt="retirer des favoris" />
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

export default Fav;
