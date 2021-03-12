import React from 'react';
import './Sessions.css'
import axios from 'axios';
import querystring from 'querystring';

class SessionsPerVehicle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            vehicle: null,
            sessionData: null,
            responseReceived: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayResults = this.displayResults.bind(this);
    }

    handleChange(event)
    {
        console.log(event.target.name);
        let target = event.target;
        let value = target.value;
        // must check for type if datatypes are different, here both are strings
        let name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(e)
    {
        e.preventDefault();

        if(this.state.vehicle && this.state.startDate && this.state.endDate)
        {

            // connect with backend function - send request
            let url = `https://localhost:8765/evcharge/api/SessionsPerEV/${this.state.vehicle}/${this.state.startDate}/${this.state.endDate}`;


                axios.get(url, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `Bearer ${document.cookie}`
                                }
                        }).then(res => {
                                let obj = res.data;
                                JSON.stringify(obj)
                                this.setState({sessionData: obj})
                                if(this.state.sessionData)
                                        this.setState({responseReceived : true});

                        })
                        .catch(error => {
                                console.error(error)
                        });



        }
        else
        {
            this.setState({ error: "Information required" });
        }
    }

    displayResults()
    {
        console.log("in display");
        return (
            <div className = "result-area">
                <div>
                    <p>Vehicle: {this.state.sessionData["VehicleID"]}</p>
                    <p>Energy consumed: {this.state.sessionData["TotalEnergyConsumed"]}</p>
                    <p>Points visited: {this.state.sessionData["NumberOfVisitedPoints"]}</p>
                    <p>Number of sessions: {this.state.sessionData["NumberOfVehicleChargingSessions"]}</p>
                </div>
                <table>
                    <tr>
                        {Object.entries(this.state.sessionData["VehicleChargingSessionsList"][0]).map(([key, value]) => <th className = "table-header"> {key} </th> )}
                    </tr>
                    { this.state.sessionData["VehicleChargingSessionsList"].map(function(dict, index){
                        return (
                            <tr>
                                {Object.entries(dict).map(([key, value]) => <td className = "table-data"> {value} </td> )}
                            </tr>
                        );})
                    }

                </table>
            </div>
        );
    }

    render()
    {
        return (
            <div>
                <h1>Sessions</h1>
                <div className = "session-form-area">
                    <form>
                        <label>
                            Vehicle:
                            <input className = "vehicle-field" name = "vehicle" value = {this.state.vehicle} onChange={this.handleChange} />
                        </label> <br />
                        <label>
                            From:
                            <input className = "date-field" type = "date" name = "startDate" value = {this.state.startDate} onChange={this.handleChange} />
                        </label> <br />
                        <label>
                            Until:
                            <input className = "date-field" type = "date" name = "endDate" value = {this.state.endDate} onChange={this.handleChange} />
                        </label> <br />
                        <button className = "search-button" onClick = {this.handleSubmit}>Search</button>
                      </form>
                  </div>
                  <hr />
                  {this.state.responseReceived ? this.displayResults() : <div></div>}
              </div>
        );
    }
}

export default SessionsPerVehicle;
