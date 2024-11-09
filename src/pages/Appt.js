import { useNavigate } from 'react-router-dom';
import '../css/Appt.css';
import { LuLogOut } from "react-icons/lu";

const Appt = () => {
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
            Appointment
            </header>
            <button onClick={logout} className="logout-button">
            <LuLogOut />
            </button>
        </div>
    );
};

export default Appt;
