import React from 'react';
import Points from './Points';
import Stations from './Stations';
import Sessions from './Sessions';
import Anotherpage from './Anotherpage';
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
            <div className="App">
                <header className = "app-header">Software Engineering Project</header>
                <Navbar />
                <Route exact path = "/homepage" component = {Homepage} />
                <Route exact path = "/stations" component = {Stations} />
                <Route exact path = "/points" component = {Points} />
                <Route exact path = "/sessions" component = {Sessions} />
                <Route exact path = "/whatever" component = {Anotherpage} />
            </div>
        );
        /*
        return (
            <div>
                <h1>This is the home page</h1>
                <div className = "login-area">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                            <input className = "username-field" type = "text" name = "username" value={this.state.username} onChange={this.handleChange} />
                        </label> <br />
                        <label>
                            Password:
                            <input className = "password-field" type = "password" name = "password" value = {this.state.password} onChange={this.handleChange} />
                        </label> <br />
                        <input className = "login-button" type = "submit" value = "Login" />
                      </form>
                  </div>
              </div>
        );
        */
    }
}

export default Homepage;
