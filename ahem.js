/**
 * Created by ogeva on 7/3/2017.
 */
'use strict';
const dotenv = require('dotenv');
const logger = require('./server/app/logger');
const fs = require('fs');
const path = require('path');
const mongo = require('mongodb');
const assert = require('assert');
const http = require('http');
require('dotenv').config()
const properties = {
  serverBaseUri: process.env.serverBaseUri,
  mongoConnectUrl: process.env.mongoConnectUrl,
  dbName: process.env.dbName || 'ahem',
  appListenPort: parseInt(process.env.appListenPort) || 3000,
  smtpPort: parseInt(process.env.smtpPort) || 25,
  emailDeleteInterval: parseInt(process.env.emailDeleteInterval) || 3600,
  emailDeleteAge: parseInt(process.env.emailDeleteAge) || 86400,
  allowAutocomplete: process.env.allowAutocomplete,
  allowedDomains: process.env.allowedDomains.split(','),
  jwtSecret: process.env.jwtSecret,
  jwtExpiresIn: parseInt(process.env.jwtExpiresIn) || 3600,
  maxAllowedApiCalls: parseInt(process.env.maxAllowedApiCalls) || 10000
};

logger.info('connecting to db', properties.mongoConnectUrl);
mongo.MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
  assert.equal(null, err);
  logger.info('Connected successfully to mongodb server');
  // creating indexes
  const db = client.db(properties.dbName);
  db.collection('mailboxes').createIndex( {'name': 1}, { unique: true } );
  db.collection('tokens').createIndex( {'ip': 1}, { unique: true } );

  const serverApp = require('./server/app/serverapp')(properties, db);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(serverApp);
  const port = process.env.PORT || properties.appListenPort || '3000';

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, function () {
    logger.info('API server listening');
  });

  const smtp = require('./server/app/smtp')(properties, db);
});
