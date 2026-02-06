import axios from "axios";

const gitHubApi = axios.create({
    baseURL:"https://api.github.com",
    headers:{
        Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
    },
});


export const searchUsers = async (query) => {
    const response = await gitHupApi.get(`/search/users?=${query}`);
    return response.data.items;
};