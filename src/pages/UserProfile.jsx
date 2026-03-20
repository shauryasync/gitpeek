import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { username } = useParams();

  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const user = await userRes.json();

        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos`,
        );
        const repoData = await repoRes.json();

        setUserData(user);
        setRepos(repoData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return <p className="text-center mt-6">Loading profile...</p>;
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto bg-white text-black p-6 rounded shadow">
      {/* Profile Info */}
      <div className="flex items-center gap-4">
        <img
          src={userData.avatar_url}
          alt="avatar"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-bold">{userData.login}</h2>
          <p className="text-gray-600">{userData.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mt-4">
        <span>Followers: {userData.followers}</span>
        <span>Following: {userData.following}</span>
        <span>Repos: {userData.public_repos}</span>
      </div>

      {/* Repo List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Repositories</h3>

        {repos.map((repo) => (
          <div key={repo.id} className="border p-3 rounded mb-2">
            {repo.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
