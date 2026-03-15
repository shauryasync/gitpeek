function RepoCard({ repo }) {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <h2 className="text-lg font-semibold">{repo.name}</h2>

      <p className="text-sm text-gray-600 mt-2">{repo.description}</p>

      <div className="flex gap-4 mt-3 text-sm">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
      </div>
    </div>
  );
}

export default RepoCard;
