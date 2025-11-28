const Search = ({ setSearch, search }) => {
  return (
    <>
      <input
        type="text"
        id="search"
        value={search}
        placeholder="%% question ou exemple %%"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </>
  );
};

export default Search;
