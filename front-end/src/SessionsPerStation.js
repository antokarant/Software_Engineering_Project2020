import React from 'react';
import './Sessions.css'
import axios from 'axios';
import querystring from 'querystring';

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

            // connect with backend function - send request
            let url = `https://localhost:8765/evcharge/api/SessionsPerStation/${this.state.station}/${this.state.startDate}/${this.state.endDate}`;


                axios.get(url, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${document.cookie}`
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
        return (
            <div className = "result-area">
                <div>
                    <p>Station: {this.state.sessionData["StationID"]}</p>
                    <p>Active chargers: {this.state.sessionData["NumberOfActivePoints"]}</p>
                    <p>Station operator: {this.state.sessionData["Operator"]}</p>
                    <p>Number of sessions: {this.state.sessionData["NumberOfChargingSessions"]}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            {Object.entries(this.state.sessionData["SessionsSummaryList"][0]).map(([key, value]) => <th key = {key} className = "table-header"> {key} </th> )}
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.sessionData["SessionsSummaryList"].map(function(dict, index){
                            return (
                                <tr key = {index}>
                                    {Object.entries(dict).map(([key, value]) => <td key = {key} className = "table-data"> {value} </td> )}
                                </tr>
                            );})
                        }
                    </tbody>
                </table>
            </div>
        );
    }


    render()
    {
        return (
            <div>
                <h1>Sessions per Station</h1>
                <div className = "session-form-area">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Station:
                            <input className = "station-field" name = "station" value = {this.state.station} onChange={this.handleChange}/>
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
