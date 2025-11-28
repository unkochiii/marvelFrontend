import "../comicSearch/search.css";
const Search = ({ setSearch, search }) => {
  return (
    <>
      <input
        type="text"
        id="search"
        value={search}
        placeholder="chercher un personnage"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </>
  );
};

export default Search;
