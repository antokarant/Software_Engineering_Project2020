import React from 'react';
import Points from './Points';
import Stations from './Stations';
import Navbar from './Navbar';
import './Homepage.css'
import {Route} from 'react-router-dom';

class Homepage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {username: "", password: "", error: null, loggedIn: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        // must check for type if datatypes are different, here both are strings
        const name = target.name;

        console.log(this.state.loggedIn);

        this.setState({ [name]: value });
    }

    handleSubmit()
    {
        console.log(this.state.username);
        this.setState({ loggedIn: true });
        this.setState({ error: null });
        if (this.state.username && this.state.password)
        {
            let requestObject = {
                username: this.state.username,
                password: this.state.password
            };
            // connect with backend function
        }
        else
        {
            this.setState({ error: "Username and Password are required" });
        }
    }

    render()
    {


        return (
            <div>
                <h1>This is the home page</h1>

              </div>
        );

    }
}

export default Homepage;
