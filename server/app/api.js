/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const jwt    = require('jsonwebtoken');


// indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('api works');
});

/**
 * returns a list of account names starting with the req.body.prefix
 */
router.post('/account/autocomplete', (req, res) => {
  req.db.collection('accounts').find({'name': {'$regex' : '^' + req.body.prefix, '$options' : 'i'}},
    {'name': 1}).toArray(function (err, accounts) {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).send(accounts.map(account => account.name));
  });
});

router.get('/properties', (req, res, next) => {
  res.json({
    serverBaseUri: req.properties.serverBaseUri,
    emailDeleteInterval: req.properties.emailDeleteInterval,
    emailDeleteAge: req.properties.emailDeleteAge,
    allowedDomains: req.properties.allowedDomains,
    customText: req.properties.customText,
    allowAutocomplete: req.properties.allowAutocomplete
  });
});

/**
 * get a token
 */
router.post('/auth/authenticate', (req, res, next) => {
  console.log('ip', req.ip);
  const payload = {
    ip: req.ip
  };
  const token = jwt.sign(payload, req.properties.jwtSecret, {
    expiresIn: req.properties.jwtExpiresIn // expires in 24 hours
  });

  // return the information including token as JSON
  res.status(200).send({
    success: true,
    token: token
  });
});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, req.properties.jwtSecret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.get('/account/:account', (req, res, next) => {
  req.db.collection('accounts').findOne({'name': req.params.account}, function (err, account) {
    if (err) {
      return res.status(500).json(err);
    }
    if (!account || account.emails.length === 0) {
      return res.status(404).send({error: 'ACCOUNT IS EMPTY!'});
    }
    res.status(200).send(account.emails);
  });
});

/**
 * returns an email object in a specific account
 */
router.get('/account/:account/:emailId', (req, res) => {

  const objectId = ObjectID.createFromHexString(req.params.emailId);
  req.db.collection('emails').findOne({'_id': objectId}, {
    'from': 1,
    'to': 1,
    'cc': 1,
    'date': 1,
    'timestamp': 1,
    'subject': 1,
    'html': 1,
    'textAsHtml': 1,
    'attachments.filename': 1
  }, function (err, doc) {
    if (err) {
      res.status(500).send({error: err});
    }
    res.status(200).send(doc);
  });
});

/**
 * updates a specific email object in a specific account
 */
router.patch('/account/:account/:emailId', (req, res) => {

  const objectId = ObjectID.createFromHexString(req.params.emailId);
  req.db.collection('accounts').updateOne({ 'name': req.params.account, 'emails.emailId' : objectId},
    {$set: {'emails.$.isRead': req.body.isRead}},
    function (err, result) {
    if (err) {
      res.status(500).send({error: err});
    }
    res.status(200).send(result);
  });
});

/**
 * returns the attachment
 */
router.get('/account/:account/:emailId/attachments/:filename', (req, res) => {
  try {

    const objectId = ObjectID.createFromHexString(req.params.emailId);
    req.db.collection('emails').findOne({'_id': objectId}, function(err, mail) {
      const attachmentsFound = mail.attachments.filter(attachment => {
        return attachment.filename === decodeURI(req.params.filename);
      });
      console.log(attachmentsFound);
      res.setHeader('Content-Type', attachmentsFound[0].contentType);
      // res.setHeader('Content-disposition', 'attachment;filename=' + attachmentsFound[0].filename);
      res.setHeader('Content-Length', attachmentsFound[0].size);
      res.writeHead(200);
      res.end(attachmentsFound[0].content.buffer);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(404).send({error: 'FILE NOT FOUND'});
  }
});

router.delete('/account/:account/:emailId', (req, res) => {
  const objectId = ObjectID.createFromHexString(req.params.emailId);
  req.db.collection('accounts').updateOne(
    { 'name' : req.params.account },
    {$pull : {'emails' : {'emailId': objectId}}}
    , function (err, result) {
      if (err) {
        res.status(500).send({error: err});
      }
      res.json({success: true});

    }
  );
});

router.delete('/account/:account', (req, res) => {
  req.db.collection('accounts').remove({'name': req.params.account}, function(err, result) {
    if (err) {
      res.status(500).send({error: err, succes: false});
    }
    res.json({success: true});
  });
});


module.exports = router;

