function SearchBar({ searchText, setSearchText, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  return (
    <form
      className="flex justify-center max-w-fit gap-2"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="search api"
        value={searchText}
        className="border rounded w-full"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit" className="rounded border bg-[#BBCBCB]">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
