/**
 * Created by ogeva on 7/3/2017.
 */
'use strict';

// Start the app
const app = require('./server/app/serverapp');
const smtp = require('./server/app/smtp');
const fileHelper = require('./server/common/fileHelper');
const MongoClient = require('mongodb').MongoClient;
const baseDir = __dirname;
const properties = fileHelper.parseJsonFile(fileHelper.path.join(baseDir, 'properties.json'));
const assert = require('assert');

const db = {};
MongoClient.connect(properties.mongoConnectUrl, function (err,dbconn) {
  assert.equal(null, err);
  db.dbConnectiob = dbconn;
  db.collection = dbconn.collection('ahem');
  console.log("Connected successfully to mongodb server");
});


console.log('starting...');
app.startServer(properties, db);
smtp.startSTMPServer(properties, baseDir, db);


