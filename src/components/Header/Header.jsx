import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logoMarvel.png";
// import heroSearch from "../heroSearch/Search";
// import comicSearch from "../comicSearch/Search";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/characters">
          <img src={Logo} alt="logo marvel" />
        </Link>

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
