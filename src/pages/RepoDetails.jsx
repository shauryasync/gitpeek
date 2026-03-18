import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RepoDetails() {
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
        );
        const data = await res.json();
        setRepoData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [owner, repo]);

  if (loading) {
    return <p className="text-center mt-6">Loading repo details...</p>;
  }

  if (!repoData) {
    return <p className="text-center mt-6">No data found</p>;
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto bg-white text-black p-6 rounded shadow">
      <h2 className="text-2xl font-bold">{repoData.name}</h2>

      <p className="mt-2 text-gray-700">{repoData.description}</p>

      <div className="flex gap-6 mt-4">
        <span>⭐ {repoData.stargazers_count}</span>
        <span>🍴 {repoData.forks_count}</span>
        <span>🐞 {repoData.open_issues_count}</span>
      </div>

      <a
        href={repoData.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 text-blue-500 underline"
      >
        View on GitHub
      </a>
    </div>
  );
}

export default RepoDetails;
