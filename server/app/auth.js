/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('./logger');





function createNewToken(req, res) {
  logger.info('ip', req.ip);
  const payload = {
    ip: req.ip
  };
//if a token doesn't exist for the ip, create new token
  logger.info('creating new token');
  const token = jwt.sign(payload, req.properties.jwtSecret, {
    expiresIn: req.properties.jwtExpiresIn
  });
  //insert in db
  req.db.collection('tokens').updateOne( {'ip': req.ip}, {$set: {'token': token}}, { upsert: true },
    function (err, result) {
      if (err) {
        logger.info(err)
        res.status(401).json({error: err});
      } else {
        res.status(200).json({
          success: true,
          token: token
        });
      }
    });
}

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.headers['Authorization'] || req.headers.authorization;
  // decode token
  if (token !== undefined && token.split(' ')[0] === 'Bearer') {

    // verifies secret and checks exp
    jwt.verify(token.split(' ')[1], req.properties.jwtSecret, function(err, decoded) {
      if (err) {
        logger.error(err);
        return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        logger.info('decoded', decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    logger.error('No token provided.');
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });

  }
}

module.exports.createNewToken = createNewToken;
module.exports.verifyToken = verifyToken;
