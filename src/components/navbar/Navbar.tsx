import { Link } from 'react-router-dom'
import { FC } from 'react'
import './navbar.css'
import { FaHome, FaFile, FaChartPie, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { userAccountStore } from '../../store/store';

interface NavbarProps {
    deconnect: (e:React.MouseEvent<HTMLButtonElement>) => void
}

const Navbar: FC<NavbarProps> = ({ deconnect }) => {
  const { burgerIsActive, setBurgerIsActive } = userAccountStore();

  const handleClick = () => {
    setBurgerIsActive(!burgerIsActive);
  };

  const onLinkClick = () => {
    if(burgerIsActive) {
      setBurgerIsActive(!burgerIsActive);
    }
  };

  return (
    <>
      <div onClick={handleClick} className={`burger ${burgerIsActive ? 'active' : ''}`}></div> 
      <div className={`container-nav ${burgerIsActive ? 'active': ''}`} >
        <nav className="navbar">
          <Link onClick={() => onLinkClick()} className="navbar-link" to="/"><FaHome/>Home</Link>
          <Link onClick={() => onLinkClick()} className="navbar-link" to="/list"><FaFile/>List</Link>
          <Link onClick={() => onLinkClick()} className="navbar-link" to="/chart"><FaChartPie/>Chart</Link>
          <Link onClick={() => onLinkClick()} className="navbar-link" to="/edit"><FaEdit/>Edit List</Link>
          <Link onClick={() => onLinkClick()} className="navbar-link" to="/param"><FaCog/>Setting</Link>
        </nav>
        <button className="navbar-button" onClick={deconnect}><FaSignOutAlt/> Log out</button>
      </div>
    </>
  );
}


export default Navbar;