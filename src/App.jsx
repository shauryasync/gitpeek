import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import RepoDetails from "./pages/RepoDetails";
import { searchRepos } from "./services/githubApi";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";

function App() {
  const [searchText, setSearchText] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = async (query) => {
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
    <div className="bg-[#634B66] min-h-screen p-6 text-white">
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                onSearch={onSearch}
              />

              {loading && <p className="text-center mt-6">Loading...</p>}

              {error && (
                <p className="text-center mt-6 text-red-400">{error}</p>
              )}

              {!loading && repos.length === 0 && hasSearched && !error && (
                <p className="text-center mt-6">No repositories found</p>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
      </Routes>
    </div>
  );
}

export default App;
