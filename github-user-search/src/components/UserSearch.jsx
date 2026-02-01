import React from 'react';

function UserSearch() {
  return (
    <div className="user-search-container">
      <form>
        <input
          type="text"
          placeholder="Enter a GitHub username"
          className="user-search-input"
        />
        <button type="submit" className="user-search-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default UserSearch;
