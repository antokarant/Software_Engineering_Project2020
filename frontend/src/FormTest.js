import React from 'react';
import FirstComponent from "./FirstComponent"
import HealthCheck from "./HealthCheck"
import axios from 'axios';
import fs from "fs";
import querystring from "querystring"



class FormTest extends React.Component {

  constructor(props) {
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
        else {
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
     {this.state.loggedin ?  <button onClick={this.LogoutProcess}>Logout</button>:<div><form><input
       type='text'
       name="username"
       onChange={this.myChangeLoginHandler}
     />
     <input
       type='text'
       name="password"
       onChange={this.myChangeLoginHandler}
     /></form><button onClick={this.LoginProcess}>Login</button></div>}


      {(this.state.showstation && this.state.loggedin) ? <HealthCheck token = {this.state.token} station = {this.state.station} datefrom = {this.state.datefrom} dateto = {this.state.dateto}/> : null}
      <button onClick={this.showspecs}>showspecs</button>
        <form>
      <input
        type='date'
        name="datefrom"
        onChange={this.myChangeHandler}
      />
      <input
        type='date'
        name="dateto"
        onChange={this.myChangeHandler}
      />
      <input
        type='int'
        name="station"
        onChange={this.myChangeHandler}
      />

      </form>
       <button onClick={this.mySubmitHandler}>button</button>

      </div>
    );
  }

LoginProcess() {
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
                        }*/
                }).then(res => {
                        console.log("we are here")
                        let obj = res.data;
                        JSON.stringify(obj)
                        this.setState({token: obj.token,
                                        loggedin: true})
                        console.log(this.state.token)
                        document.cookie = obj.token;


                })
                .catch(error => {
                        console.error("error")
                });
    }
    else{
            console.log("specify everything")
    }
  }
   LogoutProcess() {


                this.setState({token: undefined,
                            loggedin: false})
                console.log(this.state.token)
                console.log(this.state.loggedin)

}

}


export default FormTest;
