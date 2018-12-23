/**
 * Created by ogeva on 7/3/2017.
 */


'use strict';

const logger = require('./server/app/logger');
const fs = require('fs');
const path = require('path');
const mongo = require('mongodb');
const baseDir = process.cwd();
const propertiesPath = process.env.PROPERTIES_PATH || path.join(baseDir, 'properties.json');
const properties = JSON.parse(fs.readFileSync(propertiesPath));
const assert = require('assert');
const http = require('http');


logger.info('properties', properties);

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
