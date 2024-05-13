import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/NavBar/Navbar.scss';
import { IconContext } from 'react-icons';
import logo from './../Images/logo.png';
import neu from './../Images/NEU.png';

/**
 *
 * @returns the component which shows the sidebar that can navigate to the following pages
 * mentioned in the SidebarData component
 */
function Sidebar() {
  return (
    <>
      {/* to change the color of icons */}
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              // Displaying and linking each icon and Li item from Sidebar
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{ marginLeft: '16px' }}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
