import { useNavigate } from 'react-router-dom';
import '../css/Hist.css';
import { LuLogOut } from "react-icons/lu";


const Hist = () => {
    const navigate = useNavigate();
    const logout = () => {
  
    // Clear the token from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  // Redirect the user to the login page
  navigate('/login');
};
    return (
        <div>
            <header>
            Medical History
            </header>
            <button onClick={logout} className="logout-button">
            <LuLogOut />
            </button>
        </div>
    );
};

export default Hist;
