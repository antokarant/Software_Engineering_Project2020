import React from 'react';
import './Admin.css'
import axios from 'axios';
import querystring from 'querystring';

class Healthcheck extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { status: null };

        // SEND THE REQUEST FROM HERE, UPDATE STATUS
        let url = `https://localhost:8765/evcharge/api/admin/healthcheck`;
        axios.get(url, null)
            .then(res => {
                let obj = res.data;
                JSON.stringify(obj)
                //console.log(obj)
                this.setState({status: obj.status})
        })
        .catch(error => {
            console.error(error)

        });

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
