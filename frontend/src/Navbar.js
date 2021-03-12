import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import './Navbar.css';

function Navbar(props)
{
        let loggedIn = props.loggedIn
    return (
        <nav>
                this is a test
                {console.log(loggedIn)}
            <ul>
                <li><Link className = "link-text" to = "/homepage">Homepage</Link></li>
                <li><Link className = "link-text" to = "/stations">Stations</Link></li>
                <li><Link className = "link-text" to = "/points">Points</Link></li>
                <li>
                    <div className = "dropdown">
                        <div className = "link-text">Sessions</div>
                        <div className = "dropdown-content">
                            <div><Link className = "link-text" to = "/sessions-point">Per point</Link></div>
                            <div><Link className = "link-text" to = "/sessions-vehicle">Per vehicle</Link></div>
                            <div><Link className = "link-text" to = "/sessions-station">Per station</Link></div>
                            <div><Link className = "link-text" to = "/sessions-provider">Per provider</Link></div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className = "dropdown">
                        <div className = "link-text">Use Cases</div>
                        <div className = "dropdown-content">
                            <div><Link className = "link-text" to = "/select-station">Select station</Link></div>
                            <div><Link className = "link-text" to = "/charge-ev">Charge EV</Link></div>
                            <div><Link className = "link-text" to = "/diagrams">Diagrams</Link></div>
                        </div>
                    </div>
                </li>
                <li><Link className = "link-text" to = "/whatever">Whatever</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
