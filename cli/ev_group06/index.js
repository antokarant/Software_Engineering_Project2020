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
var querystring = require('querystring');
var path = require('app-root-path');
var tokenPath = path + "/softeng20bAPI.token";


//SessionsPerStation
const sessionsPerStation = (station, datefrom, dateto, format) => {
        if(format == null)
                format = "json"

        let url = `https://localhost:8765/evcharge/api/SessionsPerStation/${station}/${datefrom}/${dateto}`;

        fs.readFile(tokenPath, 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${data}`
                                },
                                params: {
                                        format: format,
                                }
                        }).then(res => {
                                let obj = res.data;
                                //JSON.stringify(obj)
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

//SessionsPerPoint
const sessionsPerPoint = (station, point, datefrom, dateto, format) => {
        if(format == null)
                format = "json"

        let url = `https://localhost:8765/evcharge/api/SessionsPerPoint/${station}/${point}/${datefrom}/${dateto}`;

        fs.readFile(tokenPath, 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${data}`
                                },
                                params: {
                                        format: format,
                                }
                        }).then(res => {
                                let obj = res.data;
                                //JSON.stringify(obj)
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

//SessionsPerEv
const sessionsPerEV = (ev, datefrom, dateto, format) => {
        if(format == null)
                format = "json"

        let url = `https://localhost:8765/evcharge/api/SessionsPerEV/${ev}/${datefrom}/${dateto}`;

        fs.readFile(tokenPath, 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${data}`
                                },
                                params: {
                                        format: format,
                                }
                        }).then(res => {
                                let obj = res.data;
                                //JSON.stringify(obj)
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

//SessionsPerProvider
const sessionsPerProvider = (provider, datefrom, dateto, format) => {
        if(format == null)
                format = "json"

        let url = `https://localhost:8765/evcharge/api/SessionsPerProvider/${provider}/${datefrom}/${dateto}`;

        fs.readFile(tokenPath, 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${data}`
                                },
                                params: {
                                        format: format,
                                }
                        }).then(res => {
                                let obj = res.data;
                                //JSON.stringify(obj)
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
const login = (username, password) => {
        let url = `https://localhost:8765/evcharge/api/login`;
        axios.post(url, querystring.stringify({
                        "username": username,
                        "password": password
                }), {
                        headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                        }
                        /*params: {
                                "username": username,
                                "password": password
                        }*/
                }).then(res => {
                        let obj = res.data;
                        JSON.stringify(obj)
                        fs.writeFile(tokenPath, obj.token, function(err) {
                                if (err) return console.log(err);
                                console.log(res.data);
                        });

                })
                .catch(error => {
                        console.error("error")
                });
}

const logout = () => {
        const path = tokenPath

        fs.unlink(path, (err) => {
                if (err) {
                        console.error(err)
                        return
                }

        })
}

const healthcheck = () => {
        let url = `https://localhost:8765/evcharge/api/admin/healthcheck`;


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

        fs.readFile(tokenPath, 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.post(url, null, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${data}`
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

        fs.readFile(tokenPath, 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }
                axios.get(url, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${data}`
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


        fs.readFile(tokenPath, 'utf8', (err, data) => {
                if (err) {
                        console.error(err)
                        return
                }

                axios.post(url, form_data, {
                                headers: {
                                        "X-OBSERVATORY-AUTH": `${data}`,
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
                                console.log("sth went wrong")
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
