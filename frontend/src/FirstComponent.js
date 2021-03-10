import axios from 'axios';

/*process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const https = require('https');
const express = require('express');
const util = require('util');
const app = express();
const port = 8000;
const bodyparser = require('body-parser');
var request = require('http').request,
        parseUrl = require('url').parse,
        JSONStream = require('JSONStream');
const axios = require('axios');
fs = require('fs');
var FormData = require('form-data');
var querystring = require('querystring');
var path = require('app-root-path');
var tokenPath = path + "/token.token";*/

import React from 'react';




class FirstComponent extends React.Component {

        constructor(props){
                super(props);
                this.state = {
                        items: null,
                        isLoaded: false,
                }
        }

  componentDidMount() {
    const apiUrl = 'https://localhost:8765/evcharge/api/admin/healthcheck';
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {this.setState({
              isLoaded: true,
              items: json,
        })
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
export default FirstComponent;
