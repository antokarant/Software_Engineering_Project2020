import React from 'react';
import './Admin.css';

class ResetSessions extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { responseReceived: false, confirm: true, troll1 : false, troll2 : false, troll3 : false, troll4 : false, troll5 : false, troll6 : false, troll7 : false, troll8: false, troll9: false };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);
        this.handleSubmit4 = this.handleSubmit4.bind(this);
        this.handleSubmit5 = this.handleSubmit5.bind(this);
        this.handleSubmit6 = this.handleSubmit6.bind(this);
        this.handleSubmit7 = this.handleSubmit7.bind(this);
        this.handleSubmit8 = this.handleSubmit8.bind(this);
        this.handleSubmit9 = this.handleSubmit9.bind(this);
        this.displayTroll1 = this.displayTroll1.bind(this);
        this.displayTroll2 = this.displayTroll2.bind(this);
        this.displayTroll3 = this.displayTroll3.bind(this);
        this.displayTroll4 = this.displayTroll4.bind(this);
        this.displayTroll5 = this.displayTroll5.bind(this);
        this.displayTroll6 = this.displayTroll6.bind(this);
        this.displayTroll7 = this.displayTroll7.bind(this);
        this.displayTroll8 = this.displayTroll8.bind(this);
        this.displayTroll9 = this.displayTroll9.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.setState({confirm : true})
    }

    handleSubmit1(e)
    {
        e.preventDefault();
        this.setState({troll1 : true})
    }

    handleSubmit2(e)
    {
        e.preventDefault();
        this.setState({troll2 : true})
    }

    handleSubmit3(e)
    {
        e.preventDefault();
        this.setState({troll3 : true})
    }

    handleSubmit4(e)
    {
        e.preventDefault();
        this.setState({troll4 : true})
    }

    handleSubmit5(e)
    {
        e.preventDefault();
        this.setState({troll5 : true})
    }

    handleSubmit6(e)
    {
        e.preventDefault();
        this.setState({troll6 : true})
    }

    handleSubmit7(e)
    {
        e.preventDefault();
        this.setState({troll7 : true})
    }

    handleSubmit8(e)
    {
        e.preventDefault();
        this.setState({troll8 : true})
    }

    handleSubmit9(e)
    {
        e.preventDefault();
        this.setState({troll9 : true})
    }

    displayTroll1()
    {
        return (
            <div className = "admin-area">
                Are you sure?
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit2}>Yes</button>
                <button className = "reset-button">No</button>
                <br />
            </div>
        )
    }

    displayTroll2()
    {
        return (
            <div className = "admin-area">
                There is no way of recovering the sessions once reset. Please confirm again:
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit3}>Yes, delete</button>
                <button className = "reset-button">No, go back</button>
                <br />
            </div>
        )
    }

    displayTroll3()
    {
        return (
            <div className = "admin-area">
                Final step: make sure you understand the consequences of resetting sessions
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit4}>I understand</button>
                <button className = "reset-button">Abort</button>
                <br />
            </div>
        )
    }

    displayTroll4()
    {
        return (
            <div className = "admin-area">
                We understand this process might be a little frustrating, but we need to make sure you know what you're doing
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit5}>Reset sessions already!!</button>
                <button className = "reset-button">No</button>
                <br />
            </div>
        )
    }

    displayTroll5()
    {
        return (
            <div className = "admin-area">
                Whoa! Are you upset about something? Perhaps that is clouding your judgment, are you <em>absolutely certain</em> you want to reset sessions?
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit6}>I am fine, just reset sessions, please</button>
                <button className = "reset-button">No</button>
                <br />
            </div>
        )
    }

    displayTroll6()
    {
        return (
            <div className = "admin-area">
                Fair enough, I believe you. Just confirming one last time!
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit7}>GODDAMMIT HOW MANY TIMES DO I HAVE TO TELL YOU STUPID THING</button>
                <button className = "reset-button">No, do not reset sessions</button>
                <br />
            </div>
        )
    }

    displayTroll7()
    {
        return (
            <div className = "admin-area">
                How rude! Well now I'm not doing it, are you happy?
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit8}>I'm sorry, I overreacted. Please, let's put this behind us</button>
                <br />
            </div>
        )
    }

    displayTroll8()
    {
        return (
            <div className = "admin-area">
                Your words were very hurtful, but maybe I will find the courage to forgive you one day. Now, remind me, what did you want? I am still in shock and cannot for the life of me remember.
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit9}>Reset Sessions</button>
                <br />
            </div>
        )
    }

    displayTroll9()
    {
        return (
            <div className = "admin-area">
                Are you sure?
                <br />
                <button className = "reset-button" onClick = {this.handleSubmit}>Yes</button>
                <button className = "reset-button">No</button>
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
                            Click here to delete all sessions forever (or until the heat death of the universe):
                        </label> <br />
                        <button className = "reset-button" onClick = {this.handleSubmit1}>Reset</button>
                    </form>
                </div>
                {this.state.troll1 ? this.displayTroll1() : <div></div>}
                {this.state.troll2 ? this.displayTroll2() : <div></div>}
                {this.state.troll3 ? this.displayTroll3() : <div></div>}
                {this.state.troll4 ? this.displayTroll4() : <div></div>}
                {this.state.troll5 ? this.displayTroll5() : <div></div>}
                {this.state.troll6 ? this.displayTroll6() : <div></div>}
                {this.state.troll7 ? this.displayTroll7() : <div></div>}
                {this.state.troll8 ? this.displayTroll8() : <div></div>}
                {this.state.troll9 ? this.displayTroll9() : <div></div>}
            </div>
        );
    }
}

export default ResetSessions;
