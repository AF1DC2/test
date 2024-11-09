import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const logout = () => {
  
    // Clear the token from localStorage
  localStorage.removeItem('authToken');

  // Redirect the user to the login page
  navigate('/login');
};
    return (
        <div>
            <header>
            Home
            </header>
            <button onClick={logout} className="logout-button">Log Out</button>
        </div>
    );
};

export default Home;
