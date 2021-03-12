import React from 'react'
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Points from './Points';
import Stations from './Stations';
import SessionsPerPoint from './SessionsPerPoint';
import SessionsPerStation from './SessionsPerStation';
import SessionsPerVehicle from './SessionsPerVehicle';
import SessionsPerProvider from './SessionsPerProvider';
import Anotherpage from './Anotherpage';
import SelectStation from './SelectStation';
import ChargeEV from './ChargeEV';
import Diagrams from './Diagrams';
import Navbar from './Navbar';
import {Route, Link, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';

class App extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            showComponent: 0,
            username: undefined,
            password: undefined,
            datefrom: undefined,
            dateto: undefined,
            station: undefined,
            showstation: false,
            loggedIn: false,
            tokenPath : "./softeng20bAPI.token",
            token: undefined,
        };

        this._onButtonClick = this._onButtonClick.bind(this);
        this.LoginProcess = this.LoginProcess.bind(this);
        this.LogoutProcess = this.LogoutProcess.bind(this);
        this.showspecs = this.showspecs.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _onButtonClick() {
        let val = 0;
        if(this.state.showComponent)
            val = 0;
        else
        {
            val = 1;
        }

        this.setState({
            showComponent: val,
        });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.dateto);
        console.log(this.state.station);
        console.log(this.state.datefrom);
        if(this.state.datefrom && this.state.dateto && this.state.station)
        {
            this.setState({showstation: true});
            console.log("submitted");
            this.setState({showStation: true});
        }
        else
        {
            console.log("you must enter everything");
        }
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

    handleSubmit(e)
    {
        e.preventDefault();
        console.log("I hate it here");
        this.setState({loggedIn : true});
    }

    showspecs = (event) => {
                    console.log(this.state.token, this.state.loggedin, document.cookie)

    }

    render()
    {
        if(this.state.loggedIn)
        {
            return (
                <div className="App">
                    <header className = "app-header">Software Engineering Project</header>
                    <Navbar />
                    <Route exact path = "/homepage" component = {Homepage} />
                    <Route exact path = "/stations" component = {Stations} />
                    <Route exact path = "/points" component = {Points} />
                    <Route exact path = "/sessions-point" component = {SessionsPerPoint} />
                    <Route exact path = "/sessions-station" component = {SessionsPerStation} />
                    <Route exact path = "/sessions-vehicle" component = {SessionsPerVehicle} />
                    <Route exact path = "/sessions-provider" component = {SessionsPerProvider} />
                    <Route exact path = "/whatever" component = {Anotherpage} />
                    <Route exact path = "/select-station" component = {SelectStation} />
                    <Route exact path = "/charge-ev" component = {ChargeEV} />
                    <Route exact path = "/diagrams" component = {Diagrams} />
                </div>
            );
        }
        else
        {
            console.log("again?");
            return (
                <div>
                    <h1>This is the login page</h1>
                    <div className = "login-area">
                        <form>
                            <label>
                                Username:
                                <input className = "username-field" type = "text" name = "username" />
                            </label> <br />
                            <label>
                                Password:
                                <input className = "password-field" type = "password" name = "password" />
                            </label> <br />
                            <button onClick={this.handleSubmit}>Login</button>
                          </form>
                      </div>
                  </div>
            );
        }



        /*
        if(this.loggedIn)
        {
            console.log("react is fucked");
            return ( <Homepage /> );
        }
        else
            return (

                <div>
                    <h1>This is the login page</h1>
                    <div className = "login-area">
                        <form>
                            <label>
                                Username:
                                <input className = "username-field" type = "text" name = "username" value = {this.state.username} onChange={this.handleChange} />
                            </label> <br />
                            <label>
                                Password:
                                <input className = "password-field" type = "password" name = "password" value = {this.state.password} onChange={this.handleChange} />
                            </label> <br />
                            <button onClick={this.LoginProcess}>Login</button>
                          </form>
                      </div>
                  </div>
            );
*/

    }

    LoginProcess()
    {
        this.setState({loggedIn : false});
    }

    LogoutProcess()
    {
        document.cookie = null;
        this.setState({token: undefined, loggedin: false})
        console.log(this.state.token)
        console.log(this.state.loggedin)
    }

}

export default App;
