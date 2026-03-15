import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import { searchRepos } from "./services/githubAPI";

function App() {
  const [searchText, setSearchText] = useState("");
  const [repos, setRepos] = useState([]);

  const onSearch = async (query) => {
    const repoData = await searchRepos(query);
    setRepos(repoData);
  };

  return (
    <div className="bg-[#634B66] min-h-screen p-6">
      <Navbar />

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={onSearch}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default App;
