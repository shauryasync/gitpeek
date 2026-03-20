function SearchBar({ searchText, setSearchText, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-xl mx-auto mt-8"
    >
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="flex-1 p-3 rounded bg-[#0d1117] border border-[#30363d] outline-none"
      />

      <button className="bg-[#238636] px-4 py-2 rounded hover:bg-[#2ea043]">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
