import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import RepoDetails from "./pages/RepoDetails";
import { searchRepos } from "./services/githubapi";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Favorites from "./pages/Favorites";

function App() {
  const [searchText, setSearchText] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = async (query) => {
    if (!query.trim()) return;
    setHasSearched(true);
    setLoading(true);
    setError("");

    try {
      const data = await searchRepos(query);
      setRepos(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch repositories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#111827] text-white p-6">
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              {/* Hero Section */}
              <div className="text-center mt-12">
                <h1 className="text-5xl font-bold tracking-tight">GitPeek</h1>

                <p className="text-gray-400 mt-4">
                  Search and explore GitHub repositories easily
                </p>
              </div>

              {/* Search */}
              <div className="mt-8 flex justify-center">
                <SearchBar
                  searchText={searchText}
                  setSearchText={setSearchText}
                  onSearch={onSearch}
                />
              </div>

              {/* States */}
              {loading && (
                <p className="text-center mt-6 text-gray-300">Loading...</p>
              )}

              {error && (
                <p className="text-center mt-6 text-red-400">{error}</p>
              )}

              {!loading && repos.length === 0 && hasSearched && !error && (
                <p className="text-center mt-6 text-gray-400">
                  No repositories found
                </p>
              )}

              {/* Repo Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </>
          }
        />

        {/* Repo Details Page */}
        <Route path="/repo/:owner/:repo" element={<RepoDetails />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Built with React • GitPeek</p>
      </footer>
    </div>
  );
}

export default App;
