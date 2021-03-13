import React from 'react';
import logo from './prometheus.png';
import './Homepage.css';

class Homepage extends React.Component
{
    constructor(props)
    {
        super(props);
    }


    render()
    {


        return (
            <div>
                <h1>This is the home page</h1>
                <div className = "home-container">
                    <img src = {logo} className = "bg-image" />
                    <div className = "home-text">
                        <p>όνομα - αμ</p>
                        <p>όνομα - αμ</p>
                        <p>όνομα - αμ</p>
                        <p>όνομα - αμ</p>
                        <br />
                        <p><i>Διδάσκων: </i></p>
                    </div>
                </div>
            </div>
        );

    }
}

export default Homepage;
