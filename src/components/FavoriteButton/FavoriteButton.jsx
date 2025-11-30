// src/components/FavoriteButton/FavoriteButton.jsx
import PropTypes from "prop-types";
import "./favoriteButton.css";
import Solid from "../../assets/images/bookmark-solid-full.svg";
import Empty from "../../assets/images/bookmark-regular-full.svg";

const FavoriteButton = ({ item, isFavorite, toggleFavorite }) => {
  // ✅ Vérification que item existe et a un _id
  if (!item || !item._id) {
    console.warn("FavoriteButton: item ou item._id est manquant", item);
    return null;
  }

  const favorited = isFavorite(item._id);

  return (
    <button
      className={`favorite-btn ${favorited ? "favorited" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(item);
      }}
      title={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      {/* 🔥 Utiliser <img> au lieu de template string */}
      <img
        src={favorited ? Solid : Empty}
        alt={favorited ? "Favori ajouté" : "Favori vide"}
        className="favorite-icon"
      />
    </button>
  );
};

// Validation des props
FavoriteButton.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.object,
  }).isRequired,
  isFavorite: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default FavoriteButton;
