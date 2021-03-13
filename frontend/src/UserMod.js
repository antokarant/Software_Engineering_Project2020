import React from 'react';
import './Admin.css'

class UserMod extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { username: null, password: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        
        if (this.state.username && this.state.password)
        {
            let requestObject = { "username": this.state.username, "password": this.state.password };
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
                <h1>User Modification</h1>
                <div className = "usermod-area">
                    <form>
                        <label className = "username-field">
                            Username:
                            <input type = "text" name = "username" value = {this.state.username} onChange = {this.handleChange}/>
                        </label>
                        <label className = "password-field">
                            Password:
                            <input type = "text" name = "password" value = {this.state.password} onChange = {this.handleChange}/>
                        </label>
                        <br />
                        <button className = "enter-button" onClick = {this.handleSubmit}>Enter</button>
                    </form>
                </div>
                <hr/>
                {this.state.responseReceived ? this.displayResults() : <div></div>}
            </div>
        );
    }
}

export default UserMod;
