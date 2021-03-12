import React from 'react';
import './Sessions.css'
import axios from 'axios';
import querystring from 'querystring';

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

            // connect with backend function - send request
            let url = `https://localhost:8765/evcharge/api/SessionsPerProvider/${this.state.provider}/${this.state.startDate}/${this.state.endDate}`;


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
                    {console.log("sdfsfd")}
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
