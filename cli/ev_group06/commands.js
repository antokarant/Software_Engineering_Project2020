#!/usr/bin/env node

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const program = require("commander");

const {
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
} = require('./index.js');

program
        .version('1.0.0')
        .description('CLI')

program
        .command('sessionsPerStation')
        .alias('Station')
        .requiredOption("--station <station>", "choose station")
        .requiredOption("--datefrom <datefrom>", "choose datefrom")
        .requiredOption("--dateto <dateto>", "choose dateto")
        .action((options) => {
                //console.log(options.dateto);
                //program.parse();
                //let options = program.opts();
                sessionsPerStation(options.station, options.datefrom, options.dateto);
        });

program
        .command('sessionsPerPoint')
        .alias('Point')
        .requiredOption("--station <station>", "choose station")
        .requiredOption("--point <point>", "choose point")
        .requiredOption("--datefrom <datefrom>", "choose datefrom")
        .requiredOption("--dateto <dateto>", "choose dateto")
        .action((options) => {
                sessionsPerPoint(options.station, options.point, options.datefrom, options.dateto);
        });

program
        .command('sessionsPerEV')
        .alias('EV')
        .requiredOption("--ev <ev>", "choose vehicle")
        .requiredOption("--datefrom <datefrom>", "choose datefrom")
        .requiredOption("--dateto <dateto>", "choose dateto")
        .action((options) => {
                sessionsPerEV(options.ev, options.datefrom, options.dateto);
        });

program
        .command('sessionsPerProvider')
        .alias('Provider')
        .requiredOption("--provider <provider>", "choose provider")
        .requiredOption("--datefrom <datefrom>", "choose datefrom")
        .requiredOption("--dateto <dateto>", "choose dateto")
        .action((options) => {
                sessionsPerProvider(options.provider, options.datefrom, options.dateto);
        });

program
        .command('login')
        .requiredOption("--username <username>", "enter username")
        .requiredOption("--passw <password>", "enter password")
        .action((options) => {
                login(options.username, options.passw);
        });

program
        .command('logout')
        .action(() => {
                logout();
        });

program
        .command('healthcheck')
        .action(() => {
                healthcheck();
        });

program
        .command('resetsessions')
        .action(() => {
                resetsessions();
        });

program
        .command('admin')
        .option("--usermod", "create user or change password")
        .option("--sessionsupd", "upload sessions")
        .option("--username <username>", "give username")
        .option("--passw <password>", "give password")
        .option("--users <user>", "get user info")
        .option("--source <source>", "give file source")
        .action((options) => {
                /*if(options.usermod && options.username && options.passw && (options.users || options.sessionsupd || options.source)){
                        console.log("you have to choose exactly one option 1")
                        return;
                }*/
                if(options.usermod && options.username && options.passw && (!options.users && !options.source && !options.sessionsupd)){
                        //console.log("usermod");
                        usermod(options.username, options.passw);
                        return;
                }
                /*else if(options.username && options.passw && (!options.users && !options.source && !options.sessionsupd && !options.usermod)){
                        console.log("username beach");
                        username(options.username, options.passw)
                        return;
                }*/
                else if(options.users && (!options.username && !options.passw && !options.source && !options.sessionsupd && !options.usermod)){
                        //console.log("users");
                        users(options.users);
                        return;
                }
                else if(options.sessionsupd && options.source && (!options.username && !options.passw && !options.users && !options.usermod)){
                        //console.log("sessionsupd");
                        sessionsupd(options.source);
                        return;
                }
                else{
                        console.log("you can choose only one legit combination see specifications")
                return;
                }

        });



program.parse(process.argv);
