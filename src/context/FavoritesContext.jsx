// src/contexts/FavoritesContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  // 🔥 Initialiser depuis localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('marvelFavorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
      return [];
    }
  });

  // 🔥 Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('marvelFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav._id === item._id);
      
      if (exists) {
        // Retirer des favoris
        return prev.filter((fav) => fav._id !== item._id);
      } else {
        // Ajouter aux favoris
        return [...prev, item];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item._id === id);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};