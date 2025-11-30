// src/pages/Comics/Comics.jsx
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useFavorites } from "../../context/FavoritesContext"; // 🔥 Import ajouté
import getImageUrl from "../../assets/utils/getImgaeUrl";
import "./comics.css";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

const Comics = () => {
  // 🔥 Plus de props
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const previousSearchRef = useRef("");

  // 🔥 On peut garder cette ligne si besoin ailleurs, sinon on peut la retirer
  // const { toggleFavorite, isFavorite } = useFavorites();

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url;

        if (search) {
          url = `https://site--marvelbackend--t4nqvl4d28d8.code.run/comics?title=${search}`;
        } else {
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
  }, [currentPage, search]);

  useEffect(() => {
    const handleStorageChange = () => {
      const searchTerm = localStorage.getItem("search") || "";

      if (previousSearchRef.current !== searchTerm) {
        setSearch(searchTerm);
        setCurrentPage(1);
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
                        {/* 🔥 On passe seulement item */}
                        <FavoriteButton item={comic} />
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
