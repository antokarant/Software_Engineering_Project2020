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
                        <p>Χαράλαμπος Δάλπης - 03117067</p>
                        <p>Σωτήριος Κανελλόπουλος - 03117101</p>
                        <p>Αντώνιος Καραντώνης - 03117439</p>
                        <p>Δημήτριος Κυριακίδης - 03117077</p>
                        <br />
                    </div>
                </div>
            </div>
        );

    }
}

export default Homepage;
