#!/usr/bin/env node

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const https = require('https');
const express = require('express');
const util = require('util');
const app = express();
const port = 8000;
const bodyparser = require('body-parser');
var request = require('http').request,
    parseUrl = require('url').parse,
    JSONStream = require('JSONStream');


//SessionsPerStation
const sessionsPerStation = (station, datefrom, dateto) => {
        let url = `https://localhost:8765/evcharge/api/SessionsPerStation/${station}/${datefrom}/${dateto}`;
        //console.log(url);
        //console.log(station);
        //console.log(datefrom);
        https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function (obj) {
                        console.log(util.inspect(obj, {showHidden: false, depth: null}));
                });
      });
}

//SessionsPerPoint
const sessionsPerPoint = (station, point, datefrom, dateto) => {
        let url = `https://localhost:8765/evcharge/api/SessionsPerPoint/${station}/${point}/${datefrom}/${dateto}`;
        https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function (obj) {
                        console.log(util.inspect(obj, {showHidden: false, depth: null}));
                });
        });

}

//SessionsPerEv
const sessionsPerEV = (ev, datefrom, dateto) => {
        let url = `https://localhost:8765/evcharge/api/SessionsPerPoint/${ev}/${datefrom}/${dateto}`;
        //let encoded_url = encodeURIComponent(url);
        //console.log(encoded_url);
        https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function (obj) {
                        console.log(util.inspect(obj, {showHidden: false, depth: null}));
                });
        });

}

//SessionsPerProvider
const sessionsPerProvider = (provider, datefrom, dateto) => {
        let url = `https://localhost:8765/evcharge/api/SessionsPerProvider/${provider}/${datefrom}/${dateto}`;
        //let encoded_url = encodeURIComponent(url);
        //console.log(encoded_url);
        https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function (obj) {
                        console.log(util.inspect(obj, {showHidden: false, depth: null}));
                });
        });

}

module.exports = {
        sessionsPerStation,
        sessionsPerPoint,
        sessionsPerEV,
        sessionsPerProvider
}




//middlewares
/*app.use(bodyparser.json());

app.listen(port, () => {
        console.log(`example app listening on port ${port}!`);
});
*/
/*app.get('/',(req,res) => {
        https.get('https://localhost:8765/evcharge/api/SessionsPerPoint/17/1/2016225/20180125',
        resb => {
            resb.on('data', data => {
                    res.send(JSON.parse(data));
                    console.log(JSON.parse(data));

            });
        });

});*/
/*
const readline = require('readline');
var rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

var waitForUserInput = function() {
  rl.question("Command: ", function(answer) {
    if (answer == "exit"){
        rl.close();
    } else {
        waitForUserInput();
    }
  });
};
waitForUserInput();
*/
