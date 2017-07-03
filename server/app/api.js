/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const fileHandler = require('../common/fileHandler');
var dataDir = 'data'
//indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('api works');
});

/**
 * returns a list of account names starting with the req.body.prefix
 */
router.post('/accounts/autocomplete', (req, res) => {
  accounts = fileHandler.listFoldersForAutoComplete(dataDir, req.body.prefix);
  res.json(accounts);
});



module.exports = router;

