import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <div id="Nav">
      <img src={logo} alt="Logo" className="nav-logo" />

      <div className="nav-links">
        <Link to="/">Profile</Link>
        <Link to="/description">Job Description</Link>
      </div>

    </div>
  );
}

export default Navbar;
