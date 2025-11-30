// src/App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Heros from "./pages/Heros/Heros";
import Comics from "./pages/Comics/Comics";
import Character from "./pages/Character/Character";
import Fav from "./pages/Fav/Fav";
import Footer from "./components/Footer/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* 🔥 Router doit envelopper tout */}
      <FavoritesProvider>
        {" "}
        {/* 🔥 Provider à l'intérieur du Router */}
        <Header /> {/* 🔥 Plus besoin de passer favorites en prop */}
        <Routes>
          {/* accueil */}
          <Route path="/" element={<Home />} />
          {/* afficher tous les personnages */}
          <Route path="/characters" element={<Heros />} />{" "}
          {/* 🔥 Plus de props */}
          {/* afficher tous les comics */}
          <Route path="/comics" element={<Comics />} /> {/* 🔥 Plus de props */}
          {/* afficher les infos d'un personnage */}
          <Route path="/character/:id" element={<Character />} />{" "}
          {/* 🔥 Plus de props */}
          {/* afficher tous favoris*/}
          <Route path="/favorite" element={<Fav />} /> {/* 🔥 Plus de props */}
        </Routes>
        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
