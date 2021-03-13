import React from 'react';
import './Admin.css'
import axios from 'axios';
import querystring from 'querystring';

class UserGet extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { username: null, responseReceived: false, userData: null, notfound:false };

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

        if (this.state.username)
        {

            // connect with backend function

            let url = `https://localhost:8765/evcharge/api/admin/users/${this.state.username}`;


               axios.get(url, {
                               headers: {
                                       "X-OBSERVATORY-AUTH": `${document.cookie}`
                               }
                       }).then(res => {
                               let obj = res.data;
                               this.setState({userData : obj});
                               this.setState({ responseReceived : true });

                       })
                       .catch(error => {
                               this.setState({ notfound : true });
                               //console.error(error)
                       });


        }
        else
        {
            this.setState({ error: "Information required" });
        }
    }

    displayResults()
    {
        console.log(this.state.userData["username"]);
        return (
            <div className = "admin-area">
                <p>User name: {this.state.userData["username"]}</p>
                <p>Password: {this.state.userData["password"]}</p>
                <p>Role: {this.state.userData["role"]}</p>
            </div>
        );
    }

    render()
    {
        return (
            <div>
                <h1>Get User Information</h1>
                <div className = "userget-area">
                    <form>
                        <label className = "username-field">
                            Username:
                            <input type = "text" name = "username" value = {this.state.username} onChange = {this.handleChange}/>
                        </label>
                        <br />
                        <button className = "enter-button" onClick = {this.handleSubmit}>Enter</button>
                    </form>
                </div>
                <hr/>
                {this.state.responseReceived && !this.state.notfound ? this.displayResults() : <div></div>}
                {this.state.responseReceived && this.state.notfound ? <div className = "admin-area">User not found</div> : <div></div>}
            </div>
        );
    }
}

export default UserGet;
