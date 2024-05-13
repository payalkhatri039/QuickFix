import logo from './../Images/logo.png';
import { Link } from 'react-router-dom';
import neu from './../Images/NEU.png';
/**
 *
 * @returns this component shows the navbar along with the NEU logo
 */
function NavBar() {
  return (
    <div className="navbar">
      <Link to="#" className="menu-bars">
        <img src={logo} className="imageLogo" />
        <img src={neu} className="imageNEU" />
      </Link>
    </div>
  );
}

export default NavBar;
