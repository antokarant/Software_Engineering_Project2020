import React from 'react';
import axios from 'axios';
import querystring from 'querystring';

import './Diagrams.css'
import { Line } from 'react-chartjs-2';

class Diagrams extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            station: null,
            startDate: null,
            endDate: null,
            plotData: null,
            vehicleData: null,
            stationData: null,
            vehicle: null,
            command: null,
            responseReceived: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePlotSubmit = this.handlePlotSubmit.bind(this);
        this.handleVehicleSubmit = this.handleVehicleSubmit.bind(this);
        this.handleAnalyticsSubmit = this.handleAnalyticsSubmit.bind(this);
        this.selectRenderer = this.selectRenderer.bind(this);
        this.plotResults = this.plotResults.bind(this);
        this.displayAnalytics = this.displayAnalytics.bind(this);
        this.vehicleReport = this.vehicleReport.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        // must check for type if datatypes are different, here both are strings
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleVehicleSubmit(event)
    {
        event.preventDefault();


           if(this.state.station && this.state.vehicle && this.state.startDate && this.state.endDate)
            {

                // connect with backend function - send request
                let url = `https://localhost:8765/evcharge/api/VehicleStation/${this.state.station}/${this.state.vehicle}/${this.state.startDate}/${this.state.endDate}`;


                    axios.get(url, {
                                    headers: {
                                            "X-OBSERVATORY-AUTH": `${document.cookie}`
                                    }
                            }).then(res => {
                                    let obj = res.data;
                                    JSON.stringify(obj)
                                    this.setState({vehicleData: obj})
                                    if(this.state.vehicleData){
                                            this.setState({command : "vehicle"});
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


    }



    handleAnalyticsSubmit(event)
    {
        event.preventDefault();


            if(this.state.station && this.state.startDate && this.state.endDate)
            {

                // connect with backend function - send request
                let url = `https://localhost:8765/evcharge/api/ReportStation/${this.state.station}/${this.state.startDate}/${this.state.endDate}`;


                    axios.get(url, {
                                    headers: {
                                            "X-OBSERVATORY-AUTH": `${document.cookie}`
                                    }
                            }).then(res => {
                                    let obj = res.data;
                                    JSON.stringify(obj)
                                    this.setState({stationData: obj})
                                    if(this.state.stationData){
                                            this.setState({command : "analytics"});
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


    }



    handlePlotSubmit(event)
    {
        event.preventDefault();



            if(this.state.station && this.state.startDate && this.state.endDate)
            {

                // connect with backend function - send request
                let url = `https://localhost:8765/evcharge/api/ChargesStation/${this.state.station}/${this.state.startDate}/${this.state.endDate}`;


                    axios.get(url, {
                                    headers: {
                                            "X-OBSERVATORY-AUTH": `${document.cookie}`
                                    }
                            }).then(res => {
                                    let obj = res.data;
                                    JSON.stringify(obj)
                                    this.setState({plotData: obj})
                                    if(this.state.plotData){
                                            this.setState({command : "plot"});
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
            // connect with backend function - send request

    }


    selectRenderer()
    {
        if(this.state.command === "plot") return this.plotResults();
        else if(this.state.command === "vehicle") return this.vehicleReport();
        else if(this.state.command === "analytics") return this.displayAnalytics();
    }

    vehicleReport()
    {
        return (
            <div className = "result-area">
                <p>Total energy consumed: {this.state.vehicleData["energy"]} kWh</p>
                <p>Total expenses: {this.state.vehicleData["expense"]} €</p>
                <p>Number of charging events: {this.state.vehicleData["transactions"]}</p>
            </div>
        )
    }

    displayAnalytics()
    {
        let avgenergy = this.state.stationData["energy"] / this.state.stationData["transactions"];
        avgenergy = Math.round(avgenergy * 100) / 100;
        let avgincome = this.state.stationData["income"] / this.state.stationData["transactions"];
        avgincome = Math.round(avgincome * 100) / 100;
        return (
            <div className = "result-area">
                <p>Total energy delivered: {this.state.stationData["energy"]} kWh</p>
                <p>Total income: {this.state.stationData["income"]} €</p>
                <p>Number of charging events: {this.state.stationData["transactions"]}</p>
                <p>Average energy per session: {avgenergy} kWh</p>
                <p>Average income per session: {avgincome} €</p>
            </div>
        );
    }

    plotResults()
    {
        let xlabels = [];
        let sessions = [];
        let incomes = [];
        let energies = [];
        for(var i = 0; i < this.state.plotData.length; i++)
        {
            xlabels.push(this.state.plotData[i]["date"]);
            sessions.push(this.state.plotData[i]["sessions"]);
            incomes.push(this.state.plotData[i]["income"]);
            energies.push(this.state.plotData[i]["energy"]);
        }

        console.log(this.state.plotData);
        console.log(xlabels);

        return (
            <div className = "result-area">
                <Line
                    data = {{
                        labels: xlabels,
                        datasets: [
                            {
                                label: "Sessions",
                                data: sessions,
                            },
                        ],
                    }}
                    options = {{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
                <br />
                <Line
                    data = {{
                        labels: xlabels,
                        datasets: [
                            {
                                label: "Income",
                                data: incomes,
                            },
                        ],
                    }}
                    options = {{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
                <br />
                <Line
                    data = {{
                        labels: xlabels,
                        datasets: [
                            {
                                label: "Energy",
                                data: energies,
                            },
                        ],
                    }}
                    options = {{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }

    render()
    {
        return (
            <div>
                <h1>Third Use Case - Diagrams</h1>
                <div className = "diagram-form-area">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Station:
                            <input className = "station-field" name = "station" value = {this.state.station} onChange={this.handleChange} />
                        </label> <br />
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
                        <button className = "plot-button" onClick = {this.handlePlotSubmit}>Plot session data</button>
                        <button className = "report-button" onClick = {this.handleVehicleSubmit}>Get vehicle report</button>
                        <button className = "analytics-button" onClick = {this.handleAnalyticsSubmit}>Station analytics</button>
                      </form>
                  </div>
                  <hr />
                  {this.state.responseReceived ? this.selectRenderer() : <div></div>}
              </div>
        );
    }
}

export default Diagrams;
