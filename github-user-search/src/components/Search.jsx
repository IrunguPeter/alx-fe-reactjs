import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (searchUsername) => {
    setLoading(true);
    setError(null);
    setUsers([]);
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchUsername}`);
      setUsers(response.data.items);
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      fetchUserData(username);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && users.length === 0 && username && <p>No users found.</p>}

      {users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">{user.login}</h2>
                <p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
