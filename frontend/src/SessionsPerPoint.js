import React from 'react';
import './Sessions.css'
import axios from 'axios';
import querystring from 'querystring';

class SessionsPerPoint extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            point: null,
            station: null,
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

        if(this.state.point && this.state.station && this.state.startDate && this.state.endDate)
        {

            // connect with backend function - send request
            let url = `https://localhost:8765/evcharge/api/SessionsPerPoint/${this.state.station}/${this.state.point}/${this.state.startDate}/${this.state.endDate}`;


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
                    <p>Station: {this.state.sessionData["Station"]}</p>
                    <p>Point: {this.state.sessionData["Point"]}</p>
                    <p>Point operator: {this.state.sessionData["PointOperator"]}</p>
                    <p>Number of sessions: {this.state.sessionData["NumberOfChargingSessions"]}</p>
                </div>
                <table>
                    <tr>
                        {Object.entries(this.state.sessionData["ChargingSessionsList"][0]).map(([key, value]) => <th className = "table-header"> {key} </th> )}
                    </tr>
                    { this.state.sessionData["ChargingSessionsList"].map(function(dict, index){
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
                            Station:
                            <input className = "point-field" name = "station" value = {this.state.station} onChange={this.handleChange} />
                        </label> <br />
                        <label>
                            Point:
                            <input className = "point-field" name = "point" value = {this.state.point} onChange={this.handleChange} />
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

export default SessionsPerPoint;
