import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Heros from "./pages/Heros/Heros";
import Comics from "./pages/Comics/Comics";
import Character from "./pages/Character/Character";
import HeroPlay from "./pages/heroPlay/heroPlay";
import Fav from "./pages/Fav/Fav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* accueil */}
          <Route path="/" element={<Home />} />
          {/* afficher tous les personnages */}
          <Route path="/characters" element={<Heros />} />
          {/* afficher tous les comics */}
          <Route path="/comics" element={<Comics />} />
          {/* afficher les infos d'un personnage */}
          <Route path="/character/:id" element={<Character />} />
          {/* afficher tous les comics où on retrouve un personnage */}
          <Route path="/heroPlay" element={<HeroPlay />} />
          {/* afficher tous favoris*/}
          <Route path="/favorite" element={<Fav />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
