import React from 'react';
import './Sessions.css'

class SessionsPerStation extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            station: null,
            startDate: null,
            endDate: null,
            sessionData: null,
            responseReceived: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayResults = this.displayResults.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        // must check for type if datatypes are different, here both are strings
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(event)
    {
        event.preventDefault();

        if(this.state.station && this.state.startDate && this.state.endDate)
        {
            let requestObject = {
                station: this.state.station,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            // connect with backend function - send request
            this.state.sessionData = {
                  "StationID": 3,
                  "Operator": 'Cristina Smith',
                  "RequestTimestamp": '2021-03-11 20:58:21.741',
                  "PeriodFrom": '19000101',
                  "PeriodTo": '20770101',
                  "TotalEnergyDelivered": 113731.36,
                  "NumberOfChargingSessions": 1267,
                  "NumberOfActivePoints": 14,
                  "SessionsSummaryList": [
                    { "PointID": 10, "PointSessions": 90, "EnergyDelivered": 8147.3022 },
                    { "PointID": 3, "PointSessions": 82, "EnergyDelivered": 7140.87 },
                    { "PointID": 11, "PointSessions": 80, "EnergyDelivered": 7034.8403 },
                    { "PointID": 1, "PointSessions": 99, "EnergyDelivered": 9387.572 },
                    { "PointID": 6, "PointSessions": 83, "EnergyDelivered": 7529.0806 },
                    { "PointID": 4, "PointSessions": 100, "EnergyDelivered": 8813.551 },
                    { "PointID": 5, "PointSessions": 88, "EnergyDelivered": 7628.5693 },
                    { "PointID": 14, "PointSessions": 98, "EnergyDelivered": 8623.301 },
                    { "PointID": 2, "PointSessions": 89, "EnergyDelivered": 7999.399 },
                    { "PointID": 13, "PointSessions": 91, "EnergyDelivered": 8339.529 },
                    { "PointID": 12, "PointSessions": 94, "EnergyDelivered": 8382.5205 },
                    { "PointID": 9, "PointSessions": 94, "EnergyDelivered": 8446.5205 },
                    { "PointID": 8, "PointSessions": 83, "EnergyDelivered": 7595.0493 },
                    { "PointID": 7, "PointSessions": 96, "EnergyDelivered": 8663.311 }
                  ]
            }
            this.setState({responseReceived : true});
        }
        else
        {
            this.setState({ error: "Information required" });
        }
    }


    displayResults()
    {
        return (
            <div className = "result-area">
                <div>
                    <p>Station: {this.state.sessionData["StationID"]}</p>
                    <p>Active chargers: {this.state.sessionData["NumberOfActivePoints"]}</p>
                    <p>Station operator: {this.state.sessionData["Operator"]}</p>
                    <p>Number of sessions: {this.state.sessionData["NumberOfChargingSessions"]}</p>
                </div>
                <table>
                    <tr>
                        {Object.entries(this.state.sessionData["SessionsSummaryList"][0]).map(([key, value]) => <th className = "table-header"> {key} </th> )}
                    </tr>
                    { this.state.sessionData["SessionsSummaryList"].map(function(dict, index){
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
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Station:
                            <select className = "station-field" name = "station" value = {this.state.station} onChange={this.handleChange}>
                                <option></option>
                                <option value = "a">A</option>
                                <option value = "b">B</option>
                                <option value = "c">C</option>
                            </select>
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
                  {this.state.responseReceived ? this.displayResults() : <div></div>}
              </div>
        );
    }
}

export default SessionsPerStation;
