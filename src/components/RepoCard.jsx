import { Link } from "react-router-dom";

function RepoCard({ repo }) {
  return (
    <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
      <div className="border rounded p-4 bg-white text-black shadow hover:scale-105 transition">
        <h2 className="text-lg font-semibold">{repo.name}</h2>

        <p className="text-sm text-gray-600 mt-2">{repo.description}</p>

        <div className="flex gap-4 mt-3 text-sm">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
        </div>
      </div>
    </Link>
  );
}

export default RepoCard;
