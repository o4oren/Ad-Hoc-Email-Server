/**
 * Created by ogeva on 7/3/2017.
 */
'use strict';

// Start the app
var path = require('path');
var app = require('./server/app/serverapp');
var smtp = require('./server/app/smtp');
var baseDir = __dirname;
var dataDir = path.join(baseDir, 'data');

console.log('starting...');
app.startServer(baseDir);
smtp.startSTMPServer(dataDir, 25);

