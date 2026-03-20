import React, { useState } from "react";
import RepoCard from "../components/RepoCard";

function Favorites() {
  const [favorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  return (
    <div className="mt-8 p-4">
      <h2 className="text-2xl font-bold text-white text-center">Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-white mt-4">No saved repositories</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {favorites.map((repo) => (
            <RepoCard key={repo.id} repo={repo} isFavoritePage={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
