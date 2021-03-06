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
        healthckeck,
        resetsessions
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
        .requiredOption("--password <password>", "enter password")
        .action((options) => {
                login(options.username, options.password);
        });

program
        .command('logout')
        .action(() => {
                logout();
        });

program
        .command('healthckeck')
        .action(() => {
                healthckeck();
        });

program
        .command('resetsessions')
        .action(() => {
                resetsessions();
        });


program.parse(process.argv);
