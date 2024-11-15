import { Outlet } from "react-router-dom";
import '../css/Layout.css';
import { FaFileMedical } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import { FaClinicMedical } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";
import { FaHandHoldingMedical } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import caresync from '../resources/caresync.png';

const Layout = () => {
    const navigate = useNavigate();
  
    return (
        <div className="home-container">
            <header>
                <img 
                    src={caresync} 
                    alt="caresync" 
                    className="logo" 
                    onClick={() => navigate('/Home')} 
                />
            </header>
            <Outlet />
            <footer className="footer">
                <button className="nav-button" onClick={() => navigate('/Hist')}>
                    <FaFileMedical />
                </button>
                <button className="nav-button" onClick={() => navigate('/Appt')}>
                    <FaHandHoldingMedical />
                </button>
                <button className="nav-button" onClick={() => navigate('/Symp')}>
                    <BiPlusMedical />
                </button>
                <button className="nav-button" onClick={() => navigate('/Med')}>
                    <FaClinicMedical />
                </button>
                <button className="nav-button" onClick={() => navigate('/Profile')}>
                    <RiProfileFill />
                </button>
            </footer>
        </div>
    );
};

export default Layout;
