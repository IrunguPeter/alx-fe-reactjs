import axios from "axios";

export const searchUsers = async ({ query, location, minRepos, page }) => {
  let q = query;

  if (location) q += ` location:${location}`;
  if (minRepos) q += ` repos:>=${minRepos}`;

  const response = await axios.get(
    "https://api.github.com/search/users",
    {
      params: {
        q,
        page,
        per_page: 10,
      },
    }
  );

  // Fetch detailed info for each user
  const usersWithDetails = await Promise.all(
    response.data.items.map(async (user) => {
      const details = await axios.get(user.url);
      return details.data;
    })
  );

  return usersWithDetails;
};

export const getUserRepos = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  return response.data;
};

