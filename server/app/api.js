/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const fileHelper = require('../common/fileHelper');
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "ahem-server"});

let properties = fileHelper.parseJsonFile('properties.json');
let dataDir = fileHelper.path.isAbsolute(properties.dataDir) ? properties.dataDir : properties.dataDir;
//indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('api works');
});

/**
 * returns a list of account names starting with the req.body.prefix
 */
router.post('/account/autocomplete', (req, res) => {
  req.db.collection("accounts").find( { "name": { $regex: ".*" + req.body.prefix + ".*" }}, {"name": 1} ).toArray(function (err, accounts) {
    if(err)
      res.status(500).json(err);
    res.status(200).send(accounts.map(account => account.name));
  });
});

router.get('/properties', (req, res, next) => {
  res.json(properties);
});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.get('/account/:account', (req, res, next) => {
  if(!fileHelper.fs.existsSync(fileHelper.path.join(dataDir, req.params.account))) {
    res.status(404).send({error: "USER DOES NOT EXIST"});
    return;
  }
  let emails = [];
  let files = fileHelper.listFiles(fileHelper.path.join(dataDir, req.params.account));
  files.forEach((f) => {
    emails.push(fileHelper.parseFileName(f));
  });

  res.json(emails);
});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.get('/account/:account/:timestamp', (req, res) => {

  try {
    let completeFileName = fileHelper.getFileOrFolderNameByPrefix(fileHelper.path.join(dataDir, req.params.account), req.params.timestamp)[0];
    let mail = fileHelper.getFileContents(fileHelper.path.join(dataDir, req.params.account), completeFileName);
    let a = mail.attachments.map(attachment => {
      attachment.content = "Use documented api to fetch the attachment!";
      return attachment;
    });
    mail.attachments = a;
    res.json(mail);
  }
  catch (e) {
    res.status(404).send({error: "FILE NOT FOUND"});
  }
});

/**
 * returns the attachment
 */
router.get('/account/:account/:timestamp/attachments/:filename', (req, res) => {
  try {
    let completeFileName = fileHelper.getFileOrFolderNameByPrefix(fileHelper.path.join(dataDir, req.params.account), req.params.timestamp)[0];
    let mail = fileHelper.getFileContents(fileHelper.path.join(dataDir, req.params.account), completeFileName);


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
  catch (e) {
    log.error(e);
    res.status(404).send({error: "FILE NOT FOUND"});
  }
});

router.delete('/account/:account/:timestamp', (req, res) => {

  try {
    let completeFileName = fileHelper.getFileOrFolderNameByPrefix(fileHelper.path.join(dataDir, req.params.account), req.params.timestamp)[0];
    let completePath = fileHelper.path.join(fileHelper.path.join(dataDir, req.params.account, completeFileName));
    log.info(completePath);
    fileHelper.deleteFile(completePath);
    res.json({success:true});
  }
  catch (e) {
    log.error(e);
    res.status(500).send({error: "FAILED TO DELETE FILE", succes:false});
  }



});

router.delete('/account/:account', (req, res) => {

  try {
    let accountPath = fileHelper.path.join(dataDir, req.params.account);
    log.info(accountPath);
    fileHelper.emptyDirectory(accountPath);
    res.json({success:true});
  }
  catch (e) {
    log.error(e);
    res.status(500).send({error: "FAILED TO DELETE ACCOUNT", succes:false});
  }
});

router.delete('/dataDir', (req, res) => {

  try {
    log.info('Deleting data dir: ' + dataDir);
    fileHelper.emptyChildDirs(dataDir);
    res.json({success:true});
  }
  catch (e) {
    log.error(e);
    res.status(500).send({error: "FAILED TO DELETE ALL ACCOUNTS", succes:false});
  }
});

module.exports = router;

