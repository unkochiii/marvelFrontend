import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Heros from "./pages/Heros/Heros";
import Comics from "./pages/Comics/Comics";
import Character from "./pages/Character/Character";
import HeroPlay from "./pages/heroPlay/heroPlay";
// ✅ CORRECTION : Importer depuis pages/Fav au lieu de components/FavoriteButton
import Fav from "./pages/Fav/Fav";

function App() {
  const [favorites, setFavorites] = useState([]);

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("marvelFavorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("marvelFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Ajouter un favori
  const addFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav._id === item._id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  // Retirer un favori
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav._id !== id));
  };

  // Vérifier si un item est en favoris
  const isFavorite = (id) => {
    return favorites.some((fav) => fav._id === id);
  };

  // Toggle favori (ajouter ou retirer)
  const toggleFavorite = (item) => {
    if (isFavorite(item._id)) {
      removeFavorite(item._id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header favorites={favorites} />
        <Routes>
          {/* accueil */}
          <Route path="/" element={<Home />} />

          {/* afficher tous les personnages */}
          <Route
            path="/characters"
            element={
              <Heros toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
            }
          />

          {/* afficher tous les comics */}
          <Route
            path="/comics"
            element={
              <Comics toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
            }
          />

          {/* afficher les infos d'un personnage */}
          <Route
            path="/character/:id"
            element={
              <Character
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />

          {/* afficher tous les comics où on retrouve un personnage */}
          <Route
            path="/heroPlay"
            element={
              <HeroPlay
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />

          {/* afficher tous favoris*/}
          <Route
            path="/favorite"
            element={
              <Fav favorites={favorites} removeFavorite={removeFavorite} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
