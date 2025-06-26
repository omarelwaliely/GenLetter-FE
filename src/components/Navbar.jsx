import '../App.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div id='Nav'>
      <Link to="/">Profile</Link>
      <Link to="/description">Job Description</Link>

    </div >
  );
}

export default Navbar;
