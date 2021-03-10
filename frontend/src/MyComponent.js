import React from 'react';
import FirstComponent from "./FirstComponent"
import HealthCheck from "./HealthCheck"



class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: 0,
      username: "antonis",
      datefrom: undefined,
      dateto: undefined,
      station: undefined,
      showstation: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
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
    if(this.state.datefrom && this.state.dateto && this.state.station){
        this.setState({showstation: true});
        console.log("submitted");
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

  render() {

    return (
      <div>
        <button onClick={this._onButtonClick}>Button</button>
        {this.state.showComponent ? <FirstComponent /> : null}
        {this.state.showstation ? <HealthCheck station = {this.state.station} datefrom = {this.state.datefrom} dateto = {this.state.dateto}/> : null}
        <form>
      <h1>Hello {this.state.username}</h1>
      <p>Enter your name:</p>
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
       <input type='submit' onChange={this.mySubmitHandler}/>
      </form>
      </div>
    );
  }
}
export default MyComponent;
