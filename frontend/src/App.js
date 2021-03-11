import React from 'react'
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Points from './Points';
import Stations from './Stations';
import Sessions from './Sessions';
import Anotherpage from './Anotherpage';
import Navbar from './Navbar';
import {Route, Link, BrowserRouter, useHistory, Redirect} from 'react-router-dom';
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
            loggedin: false,
            tokenPath : "./softeng20bAPI.token",
            token: undefined,
        };

        this._onButtonClick = this._onButtonClick.bind(this);
        this.LoginProcess = this.LoginProcess.bind(this);
        this.LogoutProcess = this.LogoutProcess.bind(this);
        this.showspecs = this.showspecs.bind(this);
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
        if(this.state.datefrom && this.state.dateto && this.state.station){
                this.setState({showstation: true});
                console.log("submitted");
                this.setState({showStation: true});


        }
        else{
                console.log("you must enter everything");
                }
}

    myChangeHandler = (event) => {
                    let nam = event.target.name;
                    let val = event.target.value;
                    this.setState({[nam]: val});

    }
    myChangeLoginHandler = (event) => {
                    let nam = event.target.name;
                    let val = event.target.value;
                    this.setState({[nam]: val});

    }
    showspecs = (event) => {
                    console.log(this.state.token, this.state.loggedin, document.cookie)

    }


    render() {

        return (
            <div>
            <Route exact path = "/homepage" component = {Homepage} />

            <Route exact path="/homepage">

                {this.state.loggedin ? <div><p>you are logged in</p></div> :<div><form><input
                    type='text'
                    name="username"
                    onChange={this.myChangeLoginHandler}
                />
                <input
                    type='text'
                    name="password"
                    onChange={this.myChangeLoginHandler}
                /></form><button onClick={this.LoginProcess}>Login</button></div>}
                    </Route>
            </div>
        );
    }

LoginProcess() {

        this.setState({loggedin: true})
        return
        /*
        if(this.state.username && this.state.password){
                        console.log(this.state.username, this.state.password, this.state.tokenPath)
                        let url = `https://localhost:8765/evcharge/api/login`;
                axios.post(url, querystring.stringify({
                                                "username": this.state.username,
                                                "password": this.state.password
                                }), {
                                                headers: {
                                                                "Content-Type": "application/x-www-form-urlencoded"
                                                }
                                                /*params: {
                                                                "username": username,
                                                                "password": password
                                                }
                                }).then(res => {
                                                console.log("we are here")
                                                let obj = res.data;
                                                JSON.stringify(obj)
                                                this.setState({token: obj.token})
                                                console.log(this.state.token)
                                                document.cookie = obj.token;
                                                if(obj.token)
                                                {
                                                                this.setState({loggedin: true})
                                                                this.props.history.push("/homepage");
                                                }

                                })
                                .catch(error => {
                                                this.setState({token: null,
                                                                                loggedin: false})
                                                                     });
        }
        else{
                        console.log("specify everything")
        }*/
    }
     LogoutProcess() {

                     document.cookie = null;

                                this.setState({token: undefined,
                                                        loggedin: false})
                                console.log(this.state.token)
                                console.log(this.state.loggedin)

}

}
/*
function App()
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
}
*/
export default App;
