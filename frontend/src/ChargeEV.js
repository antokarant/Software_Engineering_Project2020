import React from 'react';

class ChargeEV extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { area: null, error: null};

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
        this.setState({ error: null });
        if (this.state.area)
        {
            let requestObject = { area: this.state.area };
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
                <h1>First Use Case</h1>
                <div className = "select-station-area">
                    <form>
                        <label className = "area-label">
                            Upload:
                            <input type = "file" name = "area" value = {this.state.area} onChange = {this.handleChange}/>
                        </label> <br />
                        <button className = "search-button" onClick = {this.handleSubmit}>Search</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChargeEV;
