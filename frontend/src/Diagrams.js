import React from 'react';

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
            let requestObject = {
                station: this.state.station,
                vehicle: this.state.vehicle,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };

            let temp = {"energy": 150, "expense": 1500, "transactions": 10};
            this.setState({vehicleData : temp});
            this.setState({command : "vehicle"});
            this.setState({responseReceived : true});
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
            let requestObject = {
                station: this.state.station,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };

            // sums
            let temp = {"energy": 150, "income": 1500, "transactions": 170};
            this.setState({stationData : temp});
            this.setState({command : "analytics"});
            this.setState({responseReceived : true});
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
            let requestObject = {
                station: this.state.station,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            };
            // connect with backend function - send request
            let temp = [
                {"date": '2021-12-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-13-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-14-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-15-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-16-03', "sessions": 150, "income": 2500, "energy": 510},
                {"date": '2021-17-03', "sessions": 160, "income": 2400, "energy": 520},
                {"date": '2021-18-03', "sessions": 170, "income": 2300, "energy": 530},
                {"date": '2021-19-03', "sessions": 180, "income": 2200, "energy": 540},
                {"date": '2021-20-03', "sessions": 190, "income": 2100, "energy": 550},
                {"date": '2021-21-03', "sessions": 200, "income": 2000, "energy": 550},
                {"date": '2021-22-03', "sessions": 190, "income": 2100, "energy": 540},
                {"date": '2021-23-03', "sessions": 180, "income": 2200, "energy": 530},
                {"date": '2021-24-03', "sessions": 170, "income": 2300, "energy": 520},
                {"date": '2021-25-03', "sessions": 160, "income": 2400, "energy": 510},
                {"date": '2021-26-03', "sessions": 150, "income": 2500, "energy": 500},
                {"date": '2021-27-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-28-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-29-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-30-03', "sessions": 100, "income": 2000, "energy": 500},
                {"date": '2021-31-03', "sessions": 100, "income": 2000, "energy": 500}
            ]

            this.setState({plotData : temp});
            this.setState({command : "plot"});
            this.setState({responseReceived : true});
        }
        else
        {
            this.setState({ error: "Information required" });
        }
    }


    selectRenderer()
    {
        if(this.state.command == "plot") return this.plotResults();
        else if(this.state.command == "vehicle") return this.vehicleReport();
        else if(this.state.command == "analytics") return this.displayAnalytics();
    }

    vehicleReport()
    {
        return (
            <div className = "result-area">
                <p>Total energy consumed: {this.state.vehicleData["energy"]}</p>
                <p>Total expenses: {this.state.vehicleData["expense"]}</p>
                <p>Number of charging events: {this.state.vehicleData["transactions"]}</p>
            </div>
        )
    }

    displayAnalytics()
    {
        let avgenergy = (this.state.stationData["energy"] / this.state.stationData["transactions"]).toFixed(2);
        let avgincome = (this.state.stationData["income"] / this.state.stationData["transactions"]).toFixed(2);
        return (
            <div className = "result-area">
                <p>Total energy delivered: {this.state.stationData["energy"]}</p>
                <p>Total income: {this.state.stationData["income"]}</p>
                <p>Number of charging events: {this.state.stationData["transactions"]}</p>
                <p>Average energy per session: {avgenergy}</p>
                <p>Average income per session: {avgincome}</p>
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
                <h1>Use Case Diagrams</h1>
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
