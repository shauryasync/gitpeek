import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import { searchRepos } from "./services/githubApi";

function App() {
  const [searchText, setSearchText] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = async (query) => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const repoData = await searchRepos(query);
      setRepos(repoData);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching repositories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#634B66] min-h-screen p-6">
      <Navbar />

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={onSearch}
      />

      {/* Loading state */}
      {loading && (
        <p className="text-center mt-6 text-white">Loading repositories...</p>
      )}

      {/* Error state */}
      {error && <p className="text-center mt-6 text-red-400">{error}</p>}

      {/* Empty state */}
      {!loading && repos.length === 0 && hasSearched && !error && (
        <p className="text-center mt-6 text-white">No repositories found</p>
      )}

      {/* Repo list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default App;
