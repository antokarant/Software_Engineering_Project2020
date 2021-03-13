import React from 'react';

class SubmitFile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.fileInput = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        alert('Selected file - ${this.fileInput.current.files[0].name}');
    }


    render()
    {
        return (
            <div>
                <h1>First Use Case</h1>
                <div className = "file-upload-area">
                    <form>
                        <label className = "file-label">
                            Upload:
                            <input type = "file" accept = ".csv" ref = {this.fileInput} />
                        </label> <br />
                        <button className = "submit-button" onClick = {this.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SubmitFile;
