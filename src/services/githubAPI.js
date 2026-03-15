export async function searchRepos(query) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}`,
  );

  const data = await response.json();

  return data.items;
}
