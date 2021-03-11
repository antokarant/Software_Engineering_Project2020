import React from 'react';
import './Sessions.css'

class Sessions extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            station: 0,
            startDate: null,
            endDate: null,
            point: 0,
            provider: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        // must check for type if datatypes are different, here both are strings
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit()
    {
        this.setState({ error: null });
        if (this.state.station && this.state.startDate && this.state.endDate && this.state.point && this.state.provider)
        {
            let requestObject = {
                station: this.state.station,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                point: this.state.point,
                provider: this.state.provider
            };
            // connect with backend function
        }
        else
        {
            this.setState({ error: "Information required" });
        }
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
                            <input className = "date-field" type = "date" name = "start-date" value = {this.state.startDate} onChange={this.handleChange} />
                        </label> <br />
                        <label>
                            Until:
                            <input className = "date-field" type = "date" name = "end-date" value = {this.state.endDate} onChange={this.handleChange} />
                        </label> <br />
                        <label>
                            Point:
                            <select className = "point-field" name = "point" value = {this.state.point} onChange={this.handleChange}>
                                <option></option>
                                <option value = "a">A</option>
                                <option value = "b">B</option>
                                <option value = "c">C</option>
                            </select>
                        </label> <br />
                        <label>
                            Provider:
                            <select className = "provider-field" name = "provider" value = {this.state.provider} onChange={this.handleChange}>
                                <option></option>
                                <option value = "a">A</option>
                                <option value = "b">B</option>
                                <option value = "c">C</option>
                            </select>
                        </label> <br />
                        <input className = "search-button" type = "submit" value = "Search" />
                      </form>
                  </div>
              </div>
        );
    }
}

export default Sessions;
