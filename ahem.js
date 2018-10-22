/**
 * Created by ogeva on 7/3/2017.
 */


'use strict';

const logger = require('./server/app/logger');
const smtp = require('./server/app/smtp');
const serverApp = require('./server/app/serverApp');
const fs = require('fs');
const path = require('path');
const mongo = require('mongodb');
const baseDir = process.cwd();
const properties = JSON.parse(fs.readFileSync(path.join(baseDir, 'properties.json')));
const assert = require('assert');


logger.info('properties', properties);

// Start the app with a db connection
logger.info('connecting to db', properties.mongoConnectUrl);
mongo.MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
  assert.equal(null, err);
  logger.info('Connected successfully to mongodb server');
  // creating indexes
  const db = client.db(properties.dbName);
  db.collection('mailboxes').createIndex( {'name': 1}, { unique: true } );
  db.collection('tokens').createIndex( {'ip': 1}, { unique: true } );


  serverApp.startServerApp(properties, db, logger);
  smtp.startSTMPServer(properties, baseDir, db, logger);
});
