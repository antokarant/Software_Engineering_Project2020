import React from 'react';
import './Admin.css'

class Healthcheck extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { username: null, status: null };

        // SEND THE REQUEST FROM HERE, UPDATE STATUS
    }

    render()
    {
        return (
            <div>
                <h1>Health Check</h1>
                <div className = "admin-area">
                    <p>Status: {this.state.status}</p>
                </div>
            </div>
        );
    }
}

export default Healthcheck;
