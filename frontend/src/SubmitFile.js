import React from 'react';
import axios from 'axios';
import querystring from 'querystring';

class SubmitFile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.fileInput = React.createRef();
        this.state = {result: null, response: false}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        //alert(`Selected file - ${this.fileInput.current.files[0].name}`);

        let url = `https://localhost:8765/evcharge/api/admin/system/sessionsupd`;

       var newFile = this.fileInput.current.files[0];
       const form_data = new FormData();

       form_data.append("file", newFile);

       //var imagefile = document.querySelector('#file');
       //formData.append("image", imagefile.files[0]);


               axios.post(url, form_data, {
                               headers: {
                                       "X-OBSERVATORY-AUTH": `${document.cookie}`,
                                       //"Content-Type": "multipart/form-data"
                                       'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`
                               }
                       }).then(res => {
                               let val = JSON.stringify(res.data)
                               this.setState({result: val, response: true})


                       })
                       .catch(error => {
                               console.log("sth went wrong")
                               console.error(error)
                       });


    }


    render()
    {
        return (
            <div>
                <h1>Upload .csv file</h1>
                <div className = "file-upload-area">
                    <form>
                        <label className = "file-label">
                            Upload:
                            <input type = "file" accept = ".csv" ref = {this.fileInput} />
                        </label> <br />
                        <button className = "submit-button" onClick = {this.handleSubmit}>Submit</button>
                    </form>
                </div>
                {this.state.response ? <div><br /><h3>{this.state.result}</h3></div> : <div></div>}
            </div>
        );
    }
}

export default SubmitFile;
