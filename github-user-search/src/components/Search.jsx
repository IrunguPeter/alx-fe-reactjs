import { useState } from "react";
import { searchUsers } from "../services/githubService";

function Search() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUserData = async ({ query, location, minRepos, page }) => {
    try {
      const results = await searchUsers({ query, location, minRepos, page });
      return results;
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw err; // Re-throw to be handled by the caller
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setPage(1);

    try {
      const results = await fetchUserData({
        query,
        location,
        minRepos,
        page: 1,
      });
      setUsers(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const results = await fetchUserData({
        query,
        location,
        minRepos,
        page: nextPage,
      });
      setUsers((prev) => [...prev, ...results]);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="grid gap-4 md:grid-cols-3 bg-white p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Repos"
          className="border p-2 rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">No users found</p>}

      <div className="grid gap-4 mt-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 bg-gray-100 p-4 rounded"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <p>Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <button
          onClick={loadMore}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Search;
