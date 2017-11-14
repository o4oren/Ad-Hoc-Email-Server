
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';


const ObjectID = require('mongodb').ObjectID;
const path = require('path'),
    http = require('http'),
    bodyParser = require('body-parser'),
    api = require('./api');



export const serverApp = {
  startServer: function startServer(properties, db) {
    enableProdMode();
    const DIST_FOLDER = join(process.cwd(), 'dist');

    const app = express();
        // Our index.html we'll use as our template
    const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

    // * NOTE :: leave this as require() since this file is built Dynamically from webpack
    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

    const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

    app.use(function (req, res, next) {
      req.db = db;
      req.properties = properties;
      next();
    });

// Parsers for POST data
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));


// Point static path to dist
    app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
    app.use('/api', api);

// Catch all other routes and return the index file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    })
    ;

    // error handler
    app.use(function (err, req, res, next) {
      console.log(err);
      res.status(500).send({error: err.message});
    });

    /**
     * Get port from environment and store in Express.
     */
    const port = process.env.PORT || properties.appListenPort || '3000';
    app.set('port', port);

    /**
     * Create HTTP server.
     */
    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port, function () {
      console.log('ad-hoc-mail service started!');
    });

    // delete emails every interval
    setInterval(function () {
      console.log('checking for emails older than ' + properties.emailDeleteAge + ' seconds');
      db.collection('emails').find({'timestamp': {$lt: (new Date().getTime() - (properties.emailDeleteAge * 1000))}},
       {'_id': 1}).toArray(function (err, emailsToDelete) {
        console.log(emailsToDelete.length + ' emails with age > ' + properties.emailDeleteAge + ' seconds where found');
        emailsToDelete.forEach(email => {
          db.collection('accounts').update(
            { 'emails.emailId' : email._id },
            {$pull : {'emails' : {'emailId':email._id}}},
            { 'multi': true}
            , function (err, numberRemoved) {
              if (err) {
                console.log(err);
            }
              console.log('Removing ' + email._id.toString() 
              + ' has been removed from '
              + JSON.parse(numberRemoved).nModified + ' accounts.');

            }
          );

          db.collection('emails').remove({'_id': email._id}, function(err, result){
            if (err) {
              console.log(err);
            } else {
              console.log('Delete email', result.result);
            }
          });
        });
      });

      db.collection('accounts').remove({'emails': { $exists: true, $ne: '[]' }}, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Removed empty accounts', result.result );
        }
      });

    }, properties.emailDeleteInterval * 1000);

    console.log('mail server listening');
    return app;
  }

};







