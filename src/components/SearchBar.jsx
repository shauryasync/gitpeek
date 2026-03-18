function SearchBar({ searchText, setSearchText, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between gap-2 w-full">
        <input
          placeholder="search api"
          value={searchText}
          className="border rounded w-full text-black"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="rounded border bg-[#BBCBCB]">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
