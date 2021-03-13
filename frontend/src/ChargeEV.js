import React from 'react';
import './ChargeEV.css'

class ChargeEV extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            vehicle: null,
            station: null,
            charger: null,
            policy: null,
            protocol: null,
            energy: null,
            totalCost: null,
            rating: null,
            costPerkWh: null,
            costEstimated: false,
            clickedProceed: false,
            responseReceived: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.displayResults = this.displayResults.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProceed = this.handleProceed.bind(this);
        this.displayFinalStep = this.displayFinalStep.bind(this);
        this.completeTransaction = this.completeTransaction.bind(this);
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
        // random cost per kWh
        // calculate cost with input
        // display cost estimate
        // button for proceed & abort
        // -> proceed
        // cash or card & rating
        // complete transaction
        // new entry in db with date and time
        if(this.state.vehicle && this.state.station && this.state.charger && this.state.protocol && this.state.policy && this.state.energy)
        {
            let randomCost = Math.random() * 0.06 + 0.08;
            randomCost = Math.round(randomCost * 100) / 100;
            this.setState({ totalCost : randomCost * this.state.energy});
            this.setState({ costPerkWh : randomCost});
            this.setState({ costEstimated : true});
        }
        else
        {
            console.log("Insufficient information");
        }
    }

    handleProceed(e)
    {
        e.preventDefault();
        this.setState({clickedProceed : true});
    }

    displayFinalStep()
    {
        return (
            <div className = "transaction-area">
                <div className = "methodButtons" onChange = {this.handleChange}>
                    <input type="radio" value="Cash" name="method" /> Cash
                    <input type="radio" value="Card" name="method" /> Card
                </div>
                <label>
                    Rate:
                    <input type="range" min="1" max="5" value = {this.state.rating} onChange = {this.handleChange} />
                </label>
                <br />
                <br />
                <button className = "cost-button" onClick = {this.completeTransaction}>Complete transaction</button>
            </div>
        )
    }

    completeTransaction()
    {
        if(this.state.method)
        {
            let requestObject = {
                "rating" : this.state.rating,
                "cost_per_kwh" : this.state.costPerkWh,
                "total_cost" : this.state.totalCost,
                "payment_method" : this.state.method,
                "energy_delivered" : this.state.energy,
                "protocol" : this.state.protocol,
                "price_policy" : this.state.policy,
                "charger_id" : this.state.charger,
                "charger_station_id" : this.state.station,
                "license_plate" : this.state.vehicle
            }
        }
        else
        {
            console.log("please choose method");
        }
    }

    displayResults()
    {
        return (
            <div className = "result-area">
                <p>Cost estimation: {this.state.totalCost}</p>
                <button className = "cost-button" onClick = {this.handleProceed}>Proceed</button>
            </div>
        )
    }

    render()
    {
        return (
            <div>
                <h1>First Use Case</h1>
                <div className = "charge-form-area">
                    <form>
                        <label>
                            Vehicle:
                            <input className = "vehicle-field" name = "vehicle" value = {this.state.vehicle} onChange = {this.handleChange} />
                        </label> <br />
                        <label>
                            Station:
                            <input className = "station-field" name = "station" value = {this.state.station} onChange = {this.handleChange} />
                        </label> <br />
                        <label>
                            Charger:
                            <input className = "charger-field" name = "charger" value = {this.state.charger} onChange = {this.handleChange} />
                        </label> <br />
                        <label>
                            Protocol:
                            <select className = "protocol-field" name = "protocol" value = {this.state.protocol} onChange={this.handleChange}>
                                <option></option>
                                <option value = {1}>1</option>
                                <option value = {2}>2</option>
                                <option value = {3}>3</option>
                                <option value = {4}>4</option>
                                <option value = {5}>5</option>
                            </select>
                        </label>
                        <label>
                            Price policy:
                            <select className = "policy-field" name = "policy" value = {this.state.policy} onChange={this.handleChange}>
                                <option></option>
                                <option value = {1}>1</option>
                                <option value = {2}>2</option>
                                <option value = {3}>3</option>
                                <option value = {4}>4</option>
                                <option value = {5}>5</option>
                            </select>
                        </label>
                        <label>
                            Energy (kWh):
                            <input className = "vehicle-field" type = "number" name = "energy" value = {this.state.energy} onChange = {this.handleChange} />
                        </label> <br />
                        <button className = "cost-button" onClick = {this.handleSubmit}>Get cost estimation</button>
                    </form>
                </div>
                <hr />
                {this.state.costEstimated ? this.displayResults() : <div></div>}
                {this.state.clickedProceed ? this.displayFinalStep() : <div></div>}
            </div>
        );
    }
}

export default ChargeEV;
