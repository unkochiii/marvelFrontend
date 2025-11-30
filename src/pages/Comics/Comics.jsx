import axios from "axios";
import { useState, useEffect, useRef } from "react"; // 🔥 Ajout de useRef
import getImageUrl from "../../assets/utils/getImgaeUrl";
import "./comics.css";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

const Comics = ({ toggleFavorite, isFavorite }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const previousSearchRef = useRef(""); // 🔥 Ajout du ref

  const limit = 100;

  // Fetch data with pagination AND search
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url;

        if (search) {
          // 🔥 MODE RECHERCHE : cherche sur TOUTES les pages
          url = `https://site--marvelbackend--t4nqvl4d28d8.code.run/comics?title=${search}`;
        } else {
          // 📄 MODE PAGINATION : affiche page par page
          const skip = (currentPage - 1) * limit;
          url = `https://site--marvelbackend--t4nqvl4d28d8.code.run/comics?skip=${skip}&limit=${limit}`;
        }

        const response = await axios.get(url);

        setFilteredData(response.data.results);
        setTotalCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, search]); // 🔥 Re-fetch quand currentPage OU search change

  // Listen to localStorage changes for search term
  useEffect(() => {
    const handleStorageChange = () => {
      const searchTerm = localStorage.getItem("search") || "";

      // 🔥 Comparer avec la valeur précédente
      if (previousSearchRef.current !== searchTerm) {
        setSearch(searchTerm);
        setCurrentPage(1); // Reset seulement si le terme change
        previousSearchRef.current = searchTerm;
      }
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container comics">
      {isLoading ? (
        <p className="charge">Loading ...</p>
      ) : (
        <>
          <main>
            {filteredData.length === 0 ? (
              <p>Aucun comic trouvé pour "{search}"</p>
            ) : (
              <>
                {/* 🔥 Afficher le nombre de résultats en mode recherche */}
                {search && (
                  <p style={{ marginBottom: "20px", fontWeight: "bold" }}>
                    {totalCount} résultat(s) trouvé(s) pour "{search}"
                  </p>
                )}

                {filteredData.map((comic) => {
                  return (
                    <article key={comic._id} style={{ position: "relative" }}>
                      <div>
                        <h1>{comic.title}</h1>
                        <FavoriteButton
                          item={comic}
                          isFavorite={isFavorite}
                          toggleFavorite={toggleFavorite}
                        />
                      </div>
                      <img
                        src={getImageUrl(comic.thumbnail)}
                        alt={comic.title}
                      />
                      <p className="description">{comic.description}</p>
                    </article>
                  );
                })}
              </>
            )}
          </main>
        </>
      )}
      {/* 🔥 Afficher la pagination UNIQUEMENT si pas de recherche active */}
      {!search && totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Comics;
