export const searchRepos = async (query) => {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=${query}`,
  );

  const data = await res.json();

  if (!data.items) return [];

  return data.items;
};
