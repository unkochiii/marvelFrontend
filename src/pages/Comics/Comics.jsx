import axios from "axios";
import { useState, useEffect } from "react";
import getImageUrl from "../../assets/utils/getImgaeUrl";
import "./comics.css";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

const Comics = ({ toggleFavorite, isFavorite }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 100; // 100 comics par page

  // Fetch data with pagination
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const skip = (currentPage - 1) * limit; // Si page 5, skip = 4 * 100 = 400

        const response = await axios.get(
          `https://site--marvelbackend--t4nqvl4d28d8.code.run/comics?skip=${skip}&limit=${limit}`
        );

        const results = response.data.results;
        const count = response.data.count; // Total des comics

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
      const filtered = allData.filter((comic) =>
        comic.title.toLowerCase().includes(lowerSearch)
      );
      // Sort: startsWith first, then contains
      const sorted = filtered.sort((a, b) => {
        const aStartsWith = a.title.toLowerCase().startsWith(lowerSearch);
        const bStartsWith = b.title.toLowerCase().startsWith(lowerSearch);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
      });
      setFilteredData(sorted);
    }
  }, [search, allData]);

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  return (
    <div className="container comics">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <main>
            {filteredData.map((comic) => {
              return (
                <article key={comic._id} style={{ position: "relative" }}>
                  <FavoriteButton
                    item={comic}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                  />

                  <h1>{comic.title}</h1>
                  <img src={getImageUrl(comic.thumbnail)} alt={comic.title} />
                  <p className="description">{comic.description}</p>
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

export default Comics;
