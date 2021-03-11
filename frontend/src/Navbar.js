import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

function Navbar()
{
    return (
        <nav>
            <ul>
                <li><Link className = "link-text" to = "/homepage">Homepage</Link></li>
                <li><Link className = "link-text" to = "/stations">Stations</Link></li>
                <li><Link className = "link-text" to = "/points">Points</Link></li>
                <li><Link className = "link-text" to = "/sessions">Sessions</Link></li>
                <li><Link className = "link-text" to = "/whatever">Whatever</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
