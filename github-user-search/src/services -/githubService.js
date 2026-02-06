import axios from 'axios';

const GITHUB_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const searchUsers = async (searchText, location, minRepos) => {
  try {
    let query = `q=${searchText}`;
    if (location) {
      query += `+location:${location}`;
    }
    if (minRepos) {
      query += `+repos:>=${minRepos}`;
    }
    const response = await axios.get(`${GITHUB_URL}/search/users?${query}`);
    return response.data.items;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};