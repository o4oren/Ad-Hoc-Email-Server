/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "ahem-server"});
const ObjectID = require('mongodb').ObjectID;

//indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('api works');
});

/**
 * returns a list of account names starting with the req.body.prefix
 */
router.post('/account/autocomplete', (req, res) => {
  req.db.collection("accounts").find({"name": {'$regex' : '^' + req.body.prefix, '$options' : 'i'}}, {"name": 1}).toArray(function (err, accounts) {
    if (err)
      res.status(500).json(err);
    res.status(200).send(accounts.map(account => account.name));
  });
});

router.get('/properties', (req, res, next) => {
  res.json(req.properties);
});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.get('/account/:account', (req, res, next) => {
  req.db.collection("accounts").findOne({"name": req.params.account}, function (err, account) {
    if (err)
      return res.status(500).json(err);
    if (!account || account.emails.length === 0)
      return res.status(404).send({error: "ACCOUNT IS EMPTY!"});
    res.status(200).send(account.emails);
  });

});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.get('/account/:account/:emailId', (req, res) => {

  let objectId = ObjectID.createFromHexString(req.params.emailId);
  req.db.collection("emails").findOne({"_id": objectId}, {
    "from": 1,
    "to": 1,
    "cc": 1,
    "date": 1,
    "timestamp":1,
    "subject": 1,
    "html": 1,
    "textAsHtml": 1,
    "attachments.filename": 1
  },function (err, doc) {
    if(err)
      res.status(500).send({error: err});
    res.status(200).send(doc);
  });
});

/**
 * returns the attachment
 */
router.get('/account/:account/:emailId/attachments/:filename', (req, res) => {
  try {

    let objectId = ObjectID.createFromHexString(req.params.emailId);
    req.db.collection("emails").findOne({"_id": objectId}, function(err, mail) {
      let attachmentsFound = mail.attachments.filter(attachment => {
        return attachment.filename == decodeURI(req.params.filename);
      });
      log.info(attachmentsFound);
      res.setHeader('Content-Type', attachmentsFound[0].contentType);
      // res.setHeader('Content-disposition', 'attachment;filename=' + attachmentsFound[0].filename);
      res.setHeader('Content-Length', attachmentsFound[0].size);
      res.writeHead(200);
      res.end(new Buffer(attachmentsFound[0].content.data));
      }
    );
  }
  catch (e) {
    log.error(e);
    res.status(404).send({error: "FILE NOT FOUND"});
  }
});

router.delete('/account/:account/:emailId', (req, res) => {
  let objectId = ObjectID.createFromHexString(req.params.emailId);
  req.db.collection("accounts").updateOne(
    { "name" : req.params.account },
    {$pull : {"emails" : {"emailId":objectId}}}
    ,function (err, result) {
      if(err)
        res.status(500).send({error: err});
      res.json({success: true});

    }
  )
});

router.delete('/account/:account', (req, res) => {
  req.db.collection("accounts").remove({"name":req.params.account}, function(err, result){
    if(err) {
      res.status(500).send({error: err, succes: false});
    }
    res.json({success: true});
  });
});

router.delete('/dataDir', (req, res) => {

  try {
    req.db.collection("accounts").remove({});
    req.db.collection("emails").remove({});
    res.json({success: true});
  }
    catch (e) {
    log.error(e);
    res.status(500).send({error: "FAILED TO DELETE ALL ACCOUNTS", succes: false});
  }
});


module.exports = router;

