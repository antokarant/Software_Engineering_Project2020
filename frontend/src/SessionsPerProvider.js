import React from 'react';
import './Sessions.css'

class SessionsPerProvider extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            provider: null,
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

        if(this.state.provider && this.state.startDate && this.state.endDate)
        {
            let requestObject = {
                provider: this.state.provider,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            // connect with backend function - send request
            this.state.sessionData = [
                  {
                    "ProviderName": 'WATT&VOLT',
                    "StationID": 2,
                    "SessionID": 2,
                    "VehicleID": 'YNK3285',
                    "StartedOn": '2019-10-11 06:15:35',
                    "FinishedOn": '2019-10-11 07:04:42',
                    "EnergyDelivered": 98.88,
                    "PricePolicyRef": 5,
                    "CostPerKWh": 0.13,
                    "TotalCost": 12.85
                  },
                  {
                    "ProviderName": 'WATT&VOLT',
                    "StationID": 2,
                    "SessionID": 4,
                    "VehicleID": 'XIE9018',
                    "StartedOn": '2017-02-25 15:06:49',
                    "FinishedOn": '2017-02-25 15:53:02',
                    "EnergyDelivered": 101,
                    "PricePolicyRef": 4,
                    "CostPerKWh": 0.1,
                    "TotalCost": 10.1
                  },
                  {
                    "ProviderName": 'WATT&VOLT',
                    "StationID": 2,
                    "SessionID": 5,
                    "VehicleID": 'GSI7098',
                    "StartedOn": '2017-08-05 12:57:02',
                    "FinishedOn": '2017-08-05 13:55:14',
                    "EnergyDelivered": 41.51,
                    "PricePolicyRef": 1,
                    "CostPerKWh": 0.1,
                    "TotalCost": 4.15
                  },
                  {
                    "ProviderName": 'WATT&VOLT',
                    "StationID": 2,
                    "SessionID": 8,
                    "VehicleID": 'BAB0460',
                    "StartedOn": '2016-08-20 17:55:03',
                    "FinishedOn": '2016-08-20 18:15:29',
                    "EnergyDelivered": 100.29,
                    "PricePolicyRef": 2,
                    "CostPerKWh": 0.13,
                    "TotalCost": 13.04
                  }
                ]


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
                <table>
                    <tr>
                        {Object.entries(this.state.sessionData[0]).map(([key, value]) => <th className = "table-header"> {key} </th> )}
                    </tr>
                    { this.state.sessionData.map(function(dict, index){
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
                            Provider:
                            <select className = "provider-field" name = "provider" value = {this.state.provider} onChange={this.handleChange}>
                                <option></option>
                                <option value = "DEDDIE">ΔΕΔΔΗΕ</option>
                                <option value = "PROTERGEIA">PROTERGEIA</option>
                                <option value = "ELPEDISON">ELPEDISON</option>
                                <option value = "WATT&VOLT">WATT&VOLT</option>
                                <option value = "NRG">NRG</option>
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
                  <hr />
                  {this.state.responseReceived ? this.displayResults() : <div></div>}
              </div>
        );
    }
}

export default SessionsPerProvider;
