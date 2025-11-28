import axios from "axios";
import { useState, useEffect } from "react";
import getImageUrl from "../../assets/utils/getImgaeUrl";
import "./comics.css";

const Comics = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvelbackend--t4nqvl4d28d8.code.run/comics"
        );
        const payload = response.data;
        // Normalize payload so results is always an array
        const results =
          payload && payload.results
            ? payload.results
            : Array.isArray(payload)
            ? payload
            : [];
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

  return (
    <div className="container comics">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <main>
          {filteredData.map((comic) => {
            return (
              <article key={comic._id}>
                <p>{comic.title}</p>

                <img src={getImageUrl(comic.thumbnail)} alt="" />
                <p className="description">{comic.description}</p>
              </article>
            );
          })}
        </main>
      )}
    </div>
  );
};

export default Comics;
