import axios from 'axios';

import React from 'react';




class HealthCheck extends React.Component {

        constructor(props){
                super(props);
                this.state = {
                        items: null,
                        isLoaded: false,
                        datefrom: props.datefrom,
                        dateto: props.dateto,
                        station: props.station,
                        token: props.token,
                }
                console.log(document.cookie)
        }

  componentDidMount() {
              let url = `https://localhost:8765/evcharge/api/SessionsPerStation/${this.state.station}/${this.state.datefrom}/${this.state.dateto}`;


                      axios.get(url, {
                                      headers: {
                                              "X-OBSERVATORY-AUTH": `${this.state.token}`
                                      }
                              }).then(res => {
                                      let obj = res.data;
                                      JSON.stringify(obj)

                                      this.setState(
                                              {
                                                      items: obj,
                                                      isLoaded: true,
                                              }
                                      )

                              })
                              .catch(error => {
                                      console.error(error)
                              });
  }

  render() {

          var {isLoaded, items} = this.state
          if(!isLoaded)
                return (<h3>still loading</h3>)
        else {
                var counter = 1;
                var keyy;
                for (var key in items){
                        if(counter === 1){
                                keyy = key
                                break;
                        }
                }
                return (
                        <h3>
                        {key}:{items[key]}
                        </h3>

                );

        }
  }
}
export default HealthCheck;
