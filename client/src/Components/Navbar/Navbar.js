import "./Navbar.css"
import {NavLink ,Link} from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="nav">
        <ul>
            <li className="logo">
                <Link to='/' >
                    <span>logo</span>  
                </Link>
            </li>
            <li>
                <NavLink to='/' activeclassname="active">
                    <span>Home</span>  
                </NavLink>
                <NavLink to='/Dashboard'>
                    <span>DashBoard</span>  
                </NavLink>
                <NavLink to='/upload'>
                    <span> Upload</span>  
                </NavLink>
            </li>
        </ul>

    </nav>
  )
}
