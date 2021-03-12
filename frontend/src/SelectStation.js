import React from 'react';
import './SelectStation.css';
import axios from 'axios';
import querystring from 'querystring';
import './Tables.css';

class SelectStation extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { area: null, responseReceived: false, stationList: null, sortBy: null, error: null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayResults = this.displayResults.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.setState({ error: null });

            // connect with backend function
            if(this.state.area)
             {

                 // connect with backend function - send request
                 let url = `https://localhost:8765/evcharge/api/StationsNear/${this.state.area}`;


                     axios.get(url, {
                                     headers: {
                                             "X-OBSERVATORY-AUTH": `${document.cookie}`
                                     }
                             }).then(res => {
                                     let obj = res.data;
                                     JSON.stringify(obj)
                                     if(this.state.sortBy == "rating") obj = obj.sort((a, b) => b.average_rating - a.average_rating)
                                     else if(this.state.sortBy == "wait-time") obj= obj.sort((a, b) => a.wait_time_estimation - b.wait_time_estimation)
                                     this.setState({stationList: obj})
                                     if(this.state.stationList){
                                             this.setState({responseReceived : true});
                                     }

                             })
                             .catch(error => {
                                     console.error(error)
                             });



             }
             else
             {
                 this.setState({ error: "Information required" });
             }

            let val =  [
                {"station_id": 1, "location": "52731 Perez Streets Suite 180\nWaynestad, KY 42374", "working_hours": "06:00 - 24:00", "phone": "2104715864", "average_rating": 0, "operator": "Linda Todd", "operational_chargers": 20, "cars_waiting": 2, "average_charging_time": 32, "wait_time_estimation": 3},
                {"station_id": 2, "location": "USNS Campos\nFPO AA 72176", "working_hours": "06:00 - 24:00", "phone": "2103362328", "average_rating": 1, "operator": "Christopher Cunningham", "operational_chargers": 20, "cars_waiting": 6, "average_charging_time": 33, "wait_time_estimation": 9},
                {"station_id": 3, "location": "86090 Conway Mill\nEast Darrellville, AK 76689", "working_hours": "06:00 - 24:00", "phone": "2100989703", "average_rating": 0, "operator": "Brandon Thompson", "operational_chargers": 20, "cars_waiting": 5, "average_charging_time": 38, "wait_time_estimation": 9},
                {"station_id": 4, "location": "41930 Forbes Camp Suite 741\nScottshire, CA 93567", "working_hours": "06:00 - 24:00", "phone": "2102407607", "average_rating": 5, "operator": "Jamie Washington", "operational_chargers": 20, "cars_waiting": 4, "average_charging_time": 39, "wait_time_estimation": 7},
                {"station_id": 5, "location": "9980 Lewis Trafficway\nStonehaven, ID 31160", "working_hours": "06:00 - 24:00", "phone": "2107577519", "average_rating": 3, "operator": "Edward Hopkins", "operational_chargers": 20, "cars_waiting": 10, "average_charging_time": 34, "wait_time_estimation": 17}
            ];

            // pretend data came from backend

    }

    displayResults()
    {
        return (
            <div className = "result-area">
                <table>
                    <tr>
                        {Object.entries(this.state.stationList[0]).map(([key, value]) => <th key = {key} className = "table-header"> {key} </th> )}
                    </tr>
                    { this.state.stationList.map(function(dict, index){
                        return (
                            <tr>
                                {Object.entries(dict).map(([key, value]) => <td key = {key} className = "table-data"> {value} </td> )}
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
                <h1>First Use Case</h1>
                <div className = "select-station-area">
                    <form>
                        <label className = "area-label">
                            Area:
                            <input type = "text" name = "area" value = {this.state.area} onChange = {this.handleChange}/>
                        </label>
                        <label className = "sort-by-label">
                            Sort by:
                            <select className = "sort-by" name = "sortBy" value = {this.state.sortBy} onChange={this.handleChange}>
                                <option></option>
                                <option value = "rating">Rating</option>
                                <option value = "wait-time">Wait time</option>
                            </select>
                        </label>
                        <br />
                        <button className = "search-button" onClick = {this.handleSubmit}>Search</button>
                    </form>
                </div>
                <hr/>
                {this.state.responseReceived ? this.displayResults() : <div></div>}
            </div>
        );
    }
}

export default SelectStation;
