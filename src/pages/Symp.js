import { useNavigate } from 'react-router-dom';
import '../css/Symp.css';
import { LuLogOut } from "react-icons/lu";


const Symp = () => {
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
            Symptoms Log
            </header>
            <button onClick={logout} className="logout-button"><LuLogOut /></button>
        </div>
    );
};

export default Symp;
