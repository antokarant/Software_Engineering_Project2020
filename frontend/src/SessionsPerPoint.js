import React from 'react';
import './Sessions.css'

class SessionsPerPoint extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            point: null,
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

        if(this.state.point && this.state.startDate && this.state.endDate)
        {
            let requestObject = {
                point: this.state.point,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            // connect with backend function - send request
            this.state.sessionData = {
                "Station": 1,
                "Point": 1,
                "PointOperator": 'Angela Harris',
                "RequestTimestamp": '2021-03-11 20:56:19.204',
                "PeriodFrom": '20160101',
                "PeriodTo": '20200101',
                "NumberOfChargingSessions": 75,
                "ChargingSessionsList": [
                {
                    "SessionIndex": 0,
                    "SessionID": 68,
                    "StartedOn": '2016-03-09 22:22:29',
                    "FinishedOn": '2016-03-09 22:46:40',
                    "Protocol": 5,
                    "EnergyDelivered": 116.59,
                    "Payment": 'Card',
                    "VehicleType": 'Volkswagen ID.3'
                },
                {
                    "SessionIndex": 1,
                    "SessionID": 2,
                    "StartedOn": '2016-03-24 19:26:54',
                    "FinishedOn": '2016-03-24 19:41:27',
                    "Protocol": 1,
                    "EnergyDelivered": 131.9,
                    "Payment": 'Cash',
                    "VehicleType": 'Audi A3 Sportback 40 e-tron'
                },
                {
                    "SessionIndex": 2,
                    "SessionID": 6,
                    "StartedOn": '2016-05-17 20:43:54',
                    "FinishedOn": '2016-05-17 21:25:25',
                    "Protocol": 1,
                    "EnergyDelivered": 81.5,
                    "Payment": 'Cash',
                    "VehicleType": 'Opel Corsa-e'
                }
            ]}
            // pretend data came from backend
            this.setState({responseReceived : true});
        }
        else
        {
            console.log("insufficient input");
            console.log(this.state.startDate);
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
