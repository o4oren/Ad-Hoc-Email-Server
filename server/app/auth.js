/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const ObjectID = require('mongodb').ObjectID;


function createNewToken(req, res) {
  const payload = {
    ip: req.ip,
    maxAllowedApiCalls: req.properties.maxAllowedApiCalls
  };

  logger.info('creating new token');
  const token = jwt.sign(payload, req.properties.jwtSecret, {
    expiresIn: req.properties.jwtExpiresIn
  });
  //insert in db
  req.db.collection('tokens').findOneAndReplace( {'ip': req.ip}, {'ip': req.ip, 'token': token, currentApiCount: 0}, { upsert: true },
    function (err, result) {
      if (err) {
        logger.info(err)
        return res.status(500).json({error: err});
      } else {
        return res.status(200).json({
          success: true,
          token: token
        });
      }
    });
}


function verifyToken(req, res, next) {

  //If we don't use a token we return immediately
  if(req.properties.jwtExpiresIn == -1) {
    return next();
  }

  // check header or url parameters or post parameters for token
  const token = req.headers['Authorization'] || req.headers.authorization;
  // decode token
  if (token !== undefined && token.split(' ')[0] === 'Bearer') {

    // verifies secret and checks exp
    jwt.verify(token.split(' ')[1], req.properties.jwtSecret, function(err, decoded) {
      if (err) {
        logger.error(err);
        return res.status(401).send({ success: false, message: 'Token Validation failed' });
      } else {
        // verify that token is within quota
        req.db.collection('tokens').findOne( {'ip': decoded.ip}, function (err, result) {
          if(err) {
            return res.status(500).json({error: err});
          } else if(result.currentApiCount >= decoded.maxAllowedApiCalls) {
            return res.status(403).send({ success: false, message: 'API Quote Exceeded' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });
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

function increaseApiCounter(req, res, next) {

  if(req.properties.jwtExpiresIn == -1) {
    return next();
  }

  req.db.collection('tokens').updateOne( {'ip': req.decoded.ip}, {$inc: {currentApiCount: 1}},
    function (err, result) {
      if (err) {
        logger.info(err)
        return res.status(500).json({error: err});
      } else {
        next();
      }
    });
}

module.exports.createNewToken = createNewToken;
module.exports.verifyToken = verifyToken;
module.exports.increaseApiCounter = increaseApiCounter;

