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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const limit = 100; // 100 caractères par page

  // Fetch data with pagination
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const skip = (currentPage - 1) * limit; // Si page 5, skip = 4 * 100 = 400

        const response = await axios.get(
          `https://site--marvelbackend--t4nqvl4d28d8.code.run/characters?skip=${skip}&limit=${limit}`
        );

        const results = response.data.results;
        const count = response.data.count; // Assurez-vous que votre API retourne le total

        setAllData(results);
        setFilteredData(results);
        setTotalCount(count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]); // Re-fetch quand la page change

  // Listen to localStorage changes for search term
  useEffect(() => {
    const handleStorageChange = () => {
      const searchTerm = localStorage.getItem("search") || "";
      setSearch(searchTerm);
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
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
      const filtered = allData.filter((character) =>
        character.name.toLowerCase().includes(lowerSearch)
      );
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

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  return (
    <div className="container heros">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <main>
            {filteredData.map((character) => {
              return (
                <article
                  key={character._id}
                  onClick={() => handleCharacterClick(character._id)}
                  style={{ cursor: "pointer", position: "relative" }}
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
            <div className="pagination">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Heros;
