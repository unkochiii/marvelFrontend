import "./header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/logoMarvel.png";
import HeroSearch from "../heroSearch/Search";
import ComicSearch from "../comicSearch/Search";
import Persos from "../../assets/images/users-solid-full.svg";
import Fav from "../../assets/images/bookmark-solid-full.svg";
import Movies from "../../assets/images/clapperboard-solid-full.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Update localStorage whenever search changes
    localStorage.setItem("search", search);
  }, [search]);

  return (
    <header>
      <div>
        <Link to="/characters">
          <img src={Logo} alt="logo marvel" />
        </Link>
        <div className="header-search">
          {location.pathname === "/characters" && (
            <>
              <HeroSearch setSearch={setSearch} search={search} />
            </>
          )}
          {location.pathname === "/comics" && (
            <>
              <ComicSearch setSearch={setSearch} search={search} />
            </>
          )}
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/characters")}>
            <img src={Persos} alt="logo users" />
          </button>
          <button onClick={() => navigate("/comics")}>
            <img src={Movies} alt="logo movies" />
          </button>
          <button onClick={() => navigate("/favorite")}>
            <img src={Fav} alt="logo favoris" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
