const log4js  = require('log4js');

log4js.configure({
    appenders: {
        cheeseLogs: { type: 'file', filename: './logs/cheese.log' , encoding: 'utf-8', backups: 5},
        console: { type: 'console' }
    },
    categories: {
        cheese: { appenders: ['cheeseLogs'], level: 'error' },
        another: { appenders: ['console'], level: 'trace' },
        default: { appenders: ['console', 'cheeseLogs'], level: 'trace' }
    }
});

module.exports = log4js;

