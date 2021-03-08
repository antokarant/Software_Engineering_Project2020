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
const axios = require('axios');
fs = require('fs');
var FormData = require('form-data');


//SessionsPerStation
const sessionsPerStation = (station, datefrom, dateto) => {
        let url = `https://localhost:8765/evcharge/api/SessionsPerStation/${station}/${datefrom}/${dateto}`;

        fs.readFile('./token.token', 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        Authorization: `Bearer ${data}`
                                }
                        }).then(res => {
                                let obj = res.data;
                                JSON.stringify(obj)
                                console.log(util.inspect(obj, {
                                        showHidden: false,
                                        depth: null
                                }));

                        })
                        .catch(error => {
                                console.error(error)
                        });

        });

        //console.log(url);
        //console.log(station);
        //console.log(datefrom);
        /*https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function(obj) {
                        console.log(util.inspect(obj, {
                                showHidden: false,
                                depth: null
                        }));
                });
        });*/
}

//SessionsPerPoint
const sessionsPerPoint = (station, point, datefrom, dateto) => {
        let url = `https://localhost:8765/evcharge/api/SessionsPerPoint/${station}/${point}/${datefrom}/${dateto}`;

        fs.readFile('./token.token', 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        Authorization: `Bearer ${data}`
                                }
                        }).then(res => {
                                let obj = res.data;
                                JSON.stringify(obj)
                                console.log(util.inspect(obj, {
                                        showHidden: false,
                                        depth: null
                                }));

                        })
                        .catch(error => {
                                console.error(error)
                        });

        });

        /*https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function(obj) {
                        console.log(util.inspect(obj, {
                                showHidden: false,
                                depth: null
                        }));
                });
        });*/

}

//SessionsPerEv
const sessionsPerEV = (ev, datefrom, dateto) => {
        let url = `https://localhost:8765/evcharge/api/SessionsPerEV/${ev}/${datefrom}/${dateto}`;

        fs.readFile('./token.token', 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        Authorization: `Bearer ${data}`
                                }
                        }).then(res => {
                                let obj = res.data;
                                JSON.stringify(obj)
                                console.log(util.inspect(obj, {
                                        showHidden: false,
                                        depth: null
                                }));

                        })
                        .catch(error => {
                                console.error(error)
                        });

        });
        //let encoded_url = encodeURIComponent(url);
        //console.log(encoded_url);
        /*https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function(obj) {
                        console.log(util.inspect(obj, {
                                showHidden: false,
                                depth: null
                        }));
                });
        });*/

}

//SessionsPerProvider
const sessionsPerProvider = (provider, datefrom, dateto) => {

        let url = `https://localhost:8765/evcharge/api/SessionsPerProvider/${provider}/${datefrom}/${dateto}`;

        fs.readFile('./token.token', 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        Authorization: `Bearer ${data}`
                                }
                        }).then(res => {
                                let obj = res.data;
                                JSON.stringify(obj)
                                console.log(util.inspect(obj, {
                                        showHidden: false,
                                        depth: null
                                }));

                        })
                        .catch(error => {
                                console.error(error)
                        });

        });

        /*https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function(obj) {
                        console.log(util.inspect(obj, {
                                showHidden: false,
                                depth: null
                        }));
                });
        });*/
}
const login = (username, password) => {
        let url = `https://localhost:8765/evcharge/api/login`;
        axios.post(url, null, {
                        params: {
                                "username": username,
                                "password": password
                        }
                }).then(res => {
                        let obj = res.data;
                        JSON.stringify(obj)
                        fs.writeFile("./token.token", obj.token, function(err) {
                                if (err) return console.log(err);
                                console.log(res.data);
                        });

                })
                .catch(error => {
                        console.error("error")
                });
        //let encoded_url = encodeURIComponent(url);
        //let encoded_url = encodeURI(url);
        //console.log(encoded_url);
        //https.get(url, res => {
        //        res.pipe(JSONStream.parse()).on('data', function (obj) {
        //                console.log(util.inspect(obj, {showHidden: false, depth: null}));
        //        });
        //});

}
const logout = () => {
        const path = './token.token'

        fs.unlink(path, (err) => {
                if (err) {
                        console.error(err)
                        return
                }

                //file removed
        })
}

const healthcheck = () => {
        let url = `https://localhost:8765/evcharge/api/admin/healthcheck`;
        //let encoded_url = encodeURIComponent(url);
        //let encoded_url = encodeURI(url);
        //console.log(encoded_url);
        https.get(url, res => {
                res.pipe(JSONStream.parse()).on('data', function(obj) {
                        console.log(util.inspect(obj, {
                                showHidden: false,
                                depth: null
                        }));
                });
        });

}
const resetsessions = () => {
        let url = `https://localhost:8765/evcharge/api/admin/resetsessions`;
        //let encoded_url = encodeURIComponent(url);
        //let encoded_url = encodeURI(url);
        //console.log(encoded_url);
        /*https.post(url, res => {
                res.pipe(JSONStream.parse()).on('data', function(obj) {
                        console.log(util.inspect(obj, {
                                showHidden: false,
                                depth: null
                        }));
                });
        });*/
        axios.post(url, null)
                .then(res => {
                        let obj = res.data;
                        JSON.stringify(obj)
                        console.log(util.inspect(obj, {
                                showHidden: false,
                                depth: null
                        }));
                })
                .catch(error => {
                        console.error(error)
                });

}

const usermod = (username, password) => {

        let url = `https://localhost:8765/evcharge/api/admin/usermod/${username}/${password}`;

        fs.readFile('./token.token', 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.post(url, null, {
                                headers: {
                                        Authorization: `Bearer ${data}`
                                }
                        }).then(res => {
                                console.log(res.data);

                        })
                        .catch(error => {
                                console.error(error)
                        });

        });

}

const users = (username) => {

        let url = `https://localhost:8765/evcharge/api/admin/users/${username}`;

        fs.readFile('./token.token', 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        Authorization: `Bearer ${data}`
                                }
                        }).then(res => {
                                let obj = res.data;
                                JSON.stringify(obj)
                                console.log(util.inspect(obj, {
                                        showHidden: false,
                                        depth: null
                                }));

                        })
                        .catch(error => {
                                console.error(error)
                        });

        });

}

const sessionsupd = (source) => {

        let url = `https://localhost:8765/evcharge/api/admin/system/sessionsupd`;

        var newFile = fs.createReadStream(source);
        const form_data = new FormData();

        form_data.append("file", newFile);

        //var imagefile = document.querySelector('#file');
//formData.append("image", imagefile.files[0]);


        fs.readFile('./token.token', 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                /*const request_config = {
                        method: "post",
                        url: url,
                        headers: {
                                "Authorization": `Bearer ${data}`,
                                "Content-Type": "multipart/form-data"
                        },
                        data: form_data
                };
                axios.request(request_config)*/
                axios.post(url, form_data, {
                                headers: {
                                        Authorization: `Bearer ${data}`,
                                        //"Content-Type": "multipart/form-data"
                                        'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`
                                }
                        }).then(res => {
                                console.log(res.data)
                                /*let obj = res.data;
                                JSON.stringify(obj)
                                console.log(util.inspect(obj, {
                                        showHidden: false,
                                        depth: null
                                }));*/

                        })
                        .catch(error => {
                                console.log("we drank it")
                                console.error(error)
                        });

        });

}

module.exports = {
        sessionsPerStation,
        sessionsPerPoint,
        sessionsPerEV,
        sessionsPerProvider,
        login,
        logout,
        healthcheck,
        resetsessions,
        usermod,
        users,
        sessionsupd
}
