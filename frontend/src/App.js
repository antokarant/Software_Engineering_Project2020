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
import SelectStation from './SelectStation';
import ChargeEV from './ChargeEV';
import Diagrams from './Diagrams';
import Navbar from './Navbar';
import NavbarAdmin from './NavbarAdmin';
import UserMod from './UserMod';
import UserGet from './UserGet';
import HealthCheck from './HealthCheck';
import UserDelete from './UserDelete';
import ResetSessions from './ResetSessions';
import SubmitFile from './SubmitFile';
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
            role: null,
        };

        this._onButtonClick = this._onButtonClick.bind(this);
        this.LoginProcess = this.LoginProcess.bind(this);
        this.LogoutProcess = this.LogoutProcess.bind(this);
        this.showspecs = this.showspecs.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
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

    myChangeHandler = (event) => {
            event.preventDefault();

          let nam = event.target.name;
          let val = event.target.value;
          this.setState({[nam]: val});

  }

    handleSubmit(e)
    {
        e.preventDefault();
        console.log(this.state.username, this.state.password, this.state.tokenPath)

        if(this.state.username && this.state.password){
                this.LoginProcess();
        }else{
                console.log("specify everything");
        }

    }

    showspecs = (event) => {
                    console.log(this.state.token, this.state.loggedin, document.cookie)

    }

    render()
    {
        if(this.state.loggedIn)
        {
                console.log(this.state.role)
            if(this.state.role === "ADMIN")
                return (
                    <div className="App">
                        <header className = "app-header">Welcome back, Agent 47</header>
                        <NavbarAdmin />
                        <Route exact path = "/user-mod" component = {UserMod} />
                        <Route exact path = "/user-get" component = {UserGet} />
                        <Route exact path = "/user-delete" component = {UserDelete} />
                        <Route exact path = "/upload-file" component = {SubmitFile} />
                        <Route exact path = "/healthcheck" component = {HealthCheck} />
                        <Route exact path = "/reset-sessions" component = {ResetSessions} />
                    </div>
                );
            else
                return (
                    <div className="App">
                        <header className = "app-header">Software Engineering Project</header>
                        <Navbar loggedIn = {this.state.loggedIn}/>
                        <Route exact path = "/homepage" component = {Homepage} />
                        <Route exact path = "/stations" component = {Stations} />
                        <Route exact path = "/points" component = {Points} />
                        <Route exact path = "/sessions-point" component = {SessionsPerPoint} />
                        <Route exact path = "/sessions-station" component = {SessionsPerStation} />
                        <Route exact path = "/sessions-vehicle" component = {SessionsPerVehicle} />
                        <Route exact path = "/sessions-provider" component = {SessionsPerProvider} />
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
                                <input className = "username-field" type = "text" name = "username" onChange={this.myChangeHandler}/>
                            </label> <br />
                            <label>
                                Password:
                                <input className = "password-field" type = "password" name = "password" onChange={this.myChangeHandler}/>
                            </label> <br />
                            <button onClick={this.handleSubmit}>Login</button>
                          </form>
                      </div>
                  </div>
            );
        }

    }

    LoginProcess(){
            console.log(this.state.username, this.state.password, this.state.tokenPath)
            let url = `https://localhost:8765/evcharge/api/login`;
            axios.post(url,
                querystring.stringify({
                    "username": this.state.username,
                    "password": this.state.password
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(res => {
                        console.log("we are here")
                        let obj = res.data;
                        JSON.stringify(obj)
                        this.setState({token: obj.token})
                        console.log(this.state.token)
                        document.cookie = obj.token;
                        if(obj.token)
                                this.setState({loggedIn: true,})

            })
            .catch(error => {
                this.setState({token: null, loggedIn: false})
            });

            url = `https://localhost:8765/evcharge/api/users/${this.state.username}`;

            axios.get(url, null)
                .then(res => {
                    let obj = res.data;
                    console.log(obj)
                    this.setState({role: obj})
            })
            .catch(error => {
                console.error(error)
            });

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
