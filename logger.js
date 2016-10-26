const fs = require('fs');
const rotation = require('winston-daily-rotate-file');

const tsFormat = () => (new Date()).toLocaleTimeString();

let winston = require('winston');

// Create log dir if not exists
if (!fs.existsSync('log'))
    fs.mkdirSync('log');

// Assign transports
winston = new(winston.Logger)({

    transports: [

        new(winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true
        }),

        new(rotation)({
            name: 'systemLog',
            filename: './log/system.log-',
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            json: false,
            level: 'info'
        }),

        new(rotation)({
            name: 'errorLog',
            filename: './log/error.log-',
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            json: false,
            level: 'error'
        })
    ]
});

module.exports = winston;
