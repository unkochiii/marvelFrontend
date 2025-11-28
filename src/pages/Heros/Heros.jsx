import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../../assets/utils/getImgaeUrl";
import "./heros.css";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

const Heros = ({ toggleFavorite, isFavorite }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvelbackend--t4nqvl4d28d8.code.run/characters"
        );

        const results = response.data.results; // ← Correction ici
        setAllData(results);
        setFilteredData(results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Listen to localStorage changes for search term
  useEffect(() => {
    const handleStorageChange = () => {
      const searchTerm = localStorage.getItem("search") || "";
      setSearch(searchTerm);
    };

    // Set initial search term
    handleStorageChange();

    // Listen for storage changes from other tabs/windows
    window.addEventListener("storage", handleStorageChange);

    // Polling for same-tab changes (localStorage doesn't fire on same tab)
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Filter data whenever search term changes
  useEffect(() => {
    if (!search) {
      setFilteredData(allData);
    } else {
      const lowerSearch = search.toLowerCase();
      // Filter by title only
      const filtered = allData.filter((character) =>
        character.name.toLowerCase().includes(lowerSearch)
      );
      // Sort: startsWith first, then contains
      const sorted = filtered.sort((a, b) => {
        const aStartsWith = a.name.toLowerCase().startsWith(lowerSearch);
        const bStartsWith = b.name.toLowerCase().startsWith(lowerSearch);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
      });
      setFilteredData(sorted);
    }
  }, [search, allData]);

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div className="container heros">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <main>
          {filteredData.map((character) => {
            return (
              <article
                key={character._id}
                onClick={() => handleCharacterClick(character._id)}
                style={{ cursor: "pointer", position: "relative" }} // ← Ajout de position relative
              >
                <FavoriteButton
                  item={character}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />

                <h1>{character.name}</h1>
                <img
                  src={getImageUrl(character.thumbnail)}
                  alt={character.name}
                />
                <p className="description">{character.description}</p>
              </article>
            );
          })}
        </main>
      )}
    </div>
  );
};

export default Heros;
