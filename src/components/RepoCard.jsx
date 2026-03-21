import { Link } from "react-router-dom";
import { useState } from "react";

function RepoCard({ repo, isFavoritePage = false }) {
  const [isSaved, setIsSaved] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    return stored.some((item) => item.id === repo.id);
  });

  const saveRepo = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    if (stored.some((item) => item.id === repo.id)) return;

    const updated = [...stored, repo];
    localStorage.setItem("favorites", JSON.stringify(updated));

    setIsSaved(true); // 🔥 triggers UI update
  };

  const removeRepo = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    const updated = stored.filter((item) => item.id !== repo.id);
    localStorage.setItem("favorites", JSON.stringify(updated));

    window.location.reload(); // still fine for now
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded p-4 hover:border-[#58a6ff] transition">
      <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
        <h2 className="text-lg font-semibold">{repo.name}</h2>

        <p className="text-sm text-gray-400 mt-2">{repo.description}</p>

        <div className="flex gap-4 mt-3 text-sm">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
        </div>
      </Link>

      {isFavoritePage ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeRepo();
          }}
          className="mt-4 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
        >
          Remove
        </button>
      ) : (
        <button
          onClick={saveRepo}
          disabled={isSaved}
          className={`mt-4 px-3 py-1 rounded text-sm transition ${
            isSaved
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-[#238636] hover:bg-[#2ea043] text-white"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      )}
    </div>
  );
}

export default RepoCard;
