import React from 'react';
import './Admin.css'

class UserDelete extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { username: null, clickedDelete: false, responseReceived: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.finalConfirmation = this.finalConfirmation.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleClick(e)
    {
        e.preventDefault();

        this.setState({ clickedDelete: true });
    }

    handleSubmit(e)
    {
        e.preventDefault();

        if(this.state.username)
        {
            let requestObject = { "username": this.state.username };
            // connect with backend function
            this.setState({responseReceived: true});
        }
        else
        {
            this.setState({ error: "Information required" });
        }
    }

    finalConfirmation()
    {
        return (
            <div className = "admin-area">
                Permanently delete user?
                <button className = "enter-button" onClick = {this.handleSubmit}>Confirm</button>
                <br />
            </div>
        )
    }

    render()
    {
        return (
            <div>
                <h1>User Deletion</h1>
                <div className = "userget-area">
                    <form>
                        <label className = "username-field">
                            Username:
                            <input type = "text" name = "username" value = {this.state.username} onChange = {this.handleChange}/>
                        </label>
                        <br />
                        <button className = "enter-button" onClick = {this.handleClick}>Delete</button>
                    </form>
                </div>
                {this.state.clickedDelete ? this.finalConfirmation() : <div></div>}
                {this.state.responseReceived ? <div><br /><h3>User "{this.state.username}" has been terminated</h3></div> : <div></div>}
            </div>
        );
    }
}

export default UserDelete;
