import "./header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/logoMarvel.png";
import HeroSearch from "../heroSearch/Search";
import ComicSearch from "../comicSearch/Search";

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
          <button onClick={() => navigate("/characters")}>Personnages</button>
          <button onClick={() => navigate("/comics")}>Comics</button>
          <button onClick={() => navigate("/favorite")}>Favoris</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
