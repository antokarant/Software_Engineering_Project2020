import React from 'react';
import './Sessions.css'

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
            let requestObject = {
                vehicle: this.state.vehicle,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            // connect with backend function - send request
            this.state.sessionData = {
                "VehicleID": 'AAM3341',
                "RequestTimestamp": '2021-03-11 20:58:59.738',
                "PeriodFrom": '20160101',
                "PeriodTo": '20200101',
                "TotalEnergyConsumed": 403.87,
                "NumberOfVisitedPoints": 4,
                "NumberOfVehicleChargingSessions": 4,
                "VehicleChargingSessionsList": [
                  {
                    "SessionIndex": 0,
                    "SessionID": 50,
                    "EnergyProvider": 'WATT&VOLT',
                    "StartedOn": '2016-04-27 18:03:35',
                    "FinishedOn": '2016-04-27 18:57:31',
                    "EnergyDelivered": 74.09,
                    "PricePolicyRef": 5,
                    "CostPerKWh": 0.12,
                    "SessionCost": 8.89
                  },
                  {
                    "SessionIndex": 1,
                    "SessionID": 45,
                    "EnergyProvider": 'WATT&VOLT',
                    "StartedOn": '2016-05-03 07:16:26',
                    "FinishedOn": '2016-05-03 07:57:54',
                    "EnergyDelivered": 110.5,
                    "PricePolicyRef": 2,
                    "CostPerKWh": 0.1,
                    "SessionCost": 11.05
                  },
                  {
                    "SessionIndex": 2,
                    "SessionID": 59,
                    "EnergyProvider": 'WATT&VOLT',
                    "StartedOn": '2017-10-21 14:29:08',
                    "FinishedOn": '2017-10-21 15:19:15',
                    "EnergyDelivered": 138.61,
                    "PricePolicyRef": 3,
                    "CostPerKWh": 0.1,
                    "SessionCost": 13.86
                  },
                  {
                    "SessionIndex": 3,
                    "SessionID": 44,
                    "EnergyProvider": 'ELPEDISON',
                    "StartedOn": '2019-08-08 20:36:20',
                    "FinishedOn": '2019-08-08 20:59:44',
                    "EnergyDelivered": 80.67,
                    "PricePolicyRef": 1,
                    "CostPerKWh": 0.11,
                    "SessionCost": 8.87
                  }
                ]
            }
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
