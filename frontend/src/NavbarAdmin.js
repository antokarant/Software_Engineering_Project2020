import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import './Navbar.css';

function NavbarAdmin()
{

    return (
        <nav>
            <ul>
                <li><Link className = "link-text" to = "/user-mod">User Mod</Link></li>
                <li><Link className = "link-text" to = "/user-get">User Get</Link></li>
                <li><Link className = "link-text" to = "/user-delete">Delete User</Link></li>
                <li><Link className = "link-text" to = "/upload-file">Upload File</Link></li>
                <li><Link className = "link-text" to = "/healthcheck">Health Check</Link></li>
                <li><Link className = "link-text" to = "/reset-sessions">Reset Sessions</Link></li>
            </ul>
        </nav>
    );
}

export default NavbarAdmin;
