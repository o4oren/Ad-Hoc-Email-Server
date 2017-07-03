/**
 * Created by ogeva on 7/3/2017.
 */
/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  api = require('./api');

module.exports = {
  startServer: function startServer(properties) {

    const app = express();

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
      console.log("ad-hoc-mail service started!");
    });

    console.log("mail server listening");
    return app;
  }

}







