/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const fileHandler = require('../common/filesHelper');
var dataDir = 'data'
//indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('api works');
});

/**
 * returns a list of account names starting with the req.body.prefix
 */
router.post('/account/autocomplete', (req, res) => {
  accounts = fileHandler.listFoldersForAutoComplete(dataDir, req.body.prefix);
  res.json(accounts);
});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.post('/account/:account', (req, res) => {
  let emails = [];
  let files = fileHandler.listFiles(fileHandler.path.join(dataDir, req.params.account));
  files.forEach((f) => {
    emails.push(fileHandler.parseFileName(f));
  });

  res.json(emails);
});


module.exports = router;

