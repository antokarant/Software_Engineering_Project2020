import React from 'react';
import './Admin.css';
import axios from 'axios';
import querystring from 'querystring';

class ResetSessions extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { responseReceived: false, confirm: false, click0: false, click1: false, click2: false, click3: false };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick0 = this.handleClick0.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.displayConfirmation1 = this.displayConfirmation1.bind(this);
        this.displayConfirmation2 = this.displayConfirmation2.bind(this);
        this.displayConfirmation3 = this.displayConfirmation3.bind(this);
        this.displayConfirmation4 = this.displayConfirmation4.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.setState({confirm : true})
        let url = `https://localhost:8765/evcharge/api/admin/resetsessions`;

        axios.post(url, null)
                .then(res => {
                        let obj = res.data;
                        JSON.stringify(obj)

                })
                .catch(error => {
                        console.error(error)
                });

    }

    handleClick0(e)
    {
        e.preventDefault();
        this.setState({click0 : true})
    }

    handleClick1(e)
    {
        e.preventDefault();
        this.setState({click1 : true})
    }

    handleClick2(e)
    {
        e.preventDefault();
        this.setState({click2 : true})
    }

    handleClick3(e)
    {
        e.preventDefault();
        this.setState({click3 : true})
    }

    displayConfirmation1()
    {
        return (
            <div className = "admin-area">
                Are you sure?
                <br />
                <button className = "reset-button" onClick = {this.handleClick1}>Yes</button>
                <button className = "reset-button">No</button>
                <br />
            </div>
        )
    }

    displayConfirmation2()
    {
        return (
            <div className = "admin-area">
                <em>Absolutely</em> certain? This action will delete all data from the database
                <br />
                <button className = "reset-button" onClick = {this.handleClick2}>Yes</button>
                <button className = "reset-button">No</button>
                <br />
            </div>
        )
    }

    displayConfirmation3()
    {
        return (
            <div className = "admin-area">
                There is no way of recovering the sessions once reset. Please confirm again:
                <br />
                <button className = "reset-button" onClick = {this.handleClick3}>Yes, delete</button>
                <button className = "reset-button">No, go back</button>
                <br />
            </div>
        )
    }

    displayConfirmation4()
    {
        return (
            <div className = "admin-area">
                One last time!
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit}>Delete all sessions</button>
                <button className = "reset-button">Cancel</button>
                <br />
            </div>
        )
    }

    render()
    {
        return (
            <div>
                <h1>Reset Sessions</h1>
                <div className = "admin-area">
                    <form>
                        <label className = "reset-label">
                            Click here to delete all sessions forever:
                        </label> <br />
                        <button className = "reset-button" onClick = {this.handleClick0}>Reset</button>
                    </form>
                </div>
                {this.state.click0 ? this.displayConfirmation1() : <div></div>}
                {this.state.click1 ? this.displayConfirmation2() : <div></div>}
                {this.state.click2 ? this.displayConfirmation3() : <div></div>}
                {this.state.click3 ? this.displayConfirmation4() : <div></div>}
                {this.state.confirm ? <div><h3>All sessions deleted</h3></div> : <div></div>}
            </div>
        );
    }
}

export default ResetSessions;
