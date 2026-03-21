import { Link } from "react-router-dom";

function RepoCard({ repo, isFavoritePage = false }) {
  const saveRepo = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = stored.find((item) => item.id === repo.id);
    if (exists) return;

    stored.push(repo);
    localStorage.setItem("favorites", JSON.stringify(stored));
  };

  const removeRepo = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    const updated = stored.filter((item) => item.id !== repo.id);

    localStorage.setItem("favorites", JSON.stringify(updated));

    window.location.reload();
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

      {/* Conditional Button */}
      {isFavoritePage ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeRepo();
          }}
          className="mt-4 bg-red-500 px-3 py-1 rounded text-white"
        >
          Remove
        </button>
      ) : (
        <button
          onClick={saveRepo}
          className="mt-4 bg-[#238636] px-3 py-1 rounded text-white"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default RepoCard;
