function UserProfile() {
  return (
    <div className="user-profile">
      <img src="https://via.placeholder.com/150" alt="User" className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-sm my-20
      w-36 h-36 mx-auto mb-4 object-cover border-4 border-white "/>
      <h1 className="text-xl text-blue-800 my-4">John Doe</h1>
      <p className="text-gray-600 text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;
