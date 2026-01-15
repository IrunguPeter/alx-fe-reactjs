import './App.css'
import ProfilePage from './components/ProfilePage';
import UserContext from './context/UserContext.js';

function App() {
  const userData = {
    name: "Alice",
    age: "25",
    bio: "Loves hiking and photography"
  };

  return (
    <div className="App">
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>
    </div>
  );
}

export default App;
