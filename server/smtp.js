/**
 * Created by ogeva on 7/1/2017.
 */

const SMTPServer = require('smtp-server').SMTPServer;
const fs = require("fs");
const path = require('path');
const fileHandler = require('./fileHandler');
const simpleParser = require('mailparser').simpleParser;

fileHandler.createDir('data');
const baseDir = path.join(__dirname, '..', 'data');

const mailserver = new SMTPServer({
  logger: true,
  authOptional: true,
  disableReverseLookup: true,
  onConnect(session, callback){
    console.log("Connection started.")
    return callback(); // Accept the connection
  },
  onData(stream, session, callback){
    //for the first user
    name = session.envelope.rcptTo[0].address.split('@')[0];
    var dir = fileHandler.createDir(path.join(baseDir,name));
    var fileName = Date.now().toString();
    var filePath = path.join(baseDir,name,fileName);

    var mailJson = '';


    stream.on("data", function (chunk) {
      mailJson += chunk;
    });

    stream.on("end", function () {
      simpleParser(mailJson).then(mail=>{}).catch(err=>{})


      simpleParser(mailJson, (err, mail)=>{
        fs.writeFileSync(filePath, JSON.stringify(mail) , 'utf-8', callback);
      });


      if (session.envelope.rcptTo.length > 1) {
        for (i = 1; i < session.envelope.rcptTo.length; i++) {
          currentName = session.envelope.rcptTo[i].address.split('@')[0];
          var newDir = fileHandler.createDir(path.join(baseDir,currentName));
          fs.symlink(filePath, path.join(baseDir ,currentName, fileName), callback);
        }
      }
      callback();
    });


  }
});

mailserver.on('error', err => {
  console.log('Error %s', err.message);
});

mailserver.listen(25);



