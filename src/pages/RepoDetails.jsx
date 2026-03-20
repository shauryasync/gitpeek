import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="mt-10 max-w-2xl mx-auto bg-[#161b22] border border-[#30363d] p-6 rounded text-white">
      <Link to={`/user/${repoData.owner.login}`}>
        <p className="inline-block mt-4 text-[#58a6ff] underline ">
          View {repoData.owner.login}'s Profile
        </p>
      </Link>

      <p className="mt-2 text-gray-400">{repoData.description}</p>

      <div className="flex gap-6 mt-4">
        <span>⭐ {repoData.stargazers_count}</span>
        <span>🍴 {repoData.forks_count}</span>
        <span>🐞 {repoData.open_issues_count}</span>
      </div>

      <a
        href={repoData.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 text-[#58a6ff] underline"
      >
        View on GitHub
      </a>
    </div>
  );
}

export default RepoDetails;
