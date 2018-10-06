/**
 * Created by ogeva on 7/3/2017.
 */


'use strict';

import { ServerApp} from './server/app/serverapp';
const logger = require('./server/app/logger');
const smtp = require('./server/app/smtp');
const fs = require('fs');
const path = require('path');
import { MongoClient} from 'mongodb';
const baseDir = process.cwd();
const properties = JSON.parse(fs.readFileSync(path.join(baseDir, 'properties.json')));
const assert = require('assert');


logger.info('properties', properties);

// Start the app with a db connection
logger.info('connecting to db', properties.mongoConnectUrl);
MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
  assert.equal(null, err);
  logger.info('Connected successfully to mongodb server');
  // creating indexes
  const db = client.db(properties.dbName);
  db.collection('accounts').createIndex( {'name': 1}, { unique: true } );

  const server = new ServerApp();

  server.start(properties, db, logger);
  smtp.startSTMPServer(properties, baseDir, db, logger);
});
