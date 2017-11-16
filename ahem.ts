/**
 * Created by ogeva on 7/3/2017.
 */


'use strict';

// Start the app


import { ServerApp} from "./server/app/serverapp";

const smtp = require('./server/app/smtp');
const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const baseDir = __dirname;
const properties = JSON.parse(fs.readFileSync(path.join(baseDir, 'properties.json')));
const assert = require('assert');
const server = new ServerApp();

console.log('properties', properties);

MongoClient.connect(properties.mongoConnectUrl, function (err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to mongodb server');
  // creating indexes
  db.collection('accounts').createIndex( {'name': 1}, { unique: true } );

  server.start(properties, db);
  smtp.startSTMPServer(properties, baseDir, db);
});







