/**
 * Created by ogeva on 7/3/2017.
 */
'use strict';

// Start the app
var app = require('./server/app/serverapp');
var smtp = require('./server/app/smtp');
var fileHelper = require('./server/common/fileHelper');
var baseDir = __dirname;
var properties = fileHelper.parseJsonFile(fileHelper.path.join(baseDir, 'properties.json'));


console.log('starting...');
app.startServer(properties, baseDir);
smtp.startSTMPServer(properties, baseDir);


