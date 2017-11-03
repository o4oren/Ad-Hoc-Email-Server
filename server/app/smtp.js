/**
 * Created by ogeva on 7/1/2017.
 */

const SMTPServer = require('smtp-server').SMTPServer;
const fs = require("fs");
const path = require('path');
const fileHelper = require('../common/fileHelper');
const simpleParser = require('mailparser').simpleParser;

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "ahem-smtp"});

module.exports = {
  startSTMPServer: function startSTMPServer(properties, baseDir, db) {
    const dataDir = fileHelper.path.isAbsolute(properties.dataDir) ? properties.dataDir : fileHelper.path.join(baseDir, properties.dataDir);
    const smtpPort = properties.smtpPort;
    const mailserver = new SMTPServer({
      logger: true,
      authOptional: true,
      disabledCommands: ['AUTH'],
      disableReverseLookup: true,
      onConnect(session, callback){
        log.info("Connection started.")
        return callback(); // Accept the connection
      },
      onRcptTo(address, session, callback){
        if (!validateAddress(address, properties.allowedDomains)) {
          return callback(new Error('Only the domains ' + [JSON.stringify(properties.allowedDomains)] + ' are allowed to receive mail'));
        }
        return callback(); // Accept the address
      },
      onData(stream, session, callback){
        let mailDataString = '';
        const rcptTo = session.envelope.rcptTo;

        stream.on("data", function (chunk) {
          mailDataString += chunk;
        });

        stream.on("end", function () {


          const name = rcptTo[0].address.split('@')[0];

          let fileName;
          let filePath;

          simpleParser(mailDataString, (err, mail) => {



            ////////
            ///part for db, rest of this method can be deleted when it's done

            db.collection('emails').insertOne(mail, function (err, result) {
              if (err) {
                return console.error(err);
              }

              mail.to.value.forEach(recipient => {
                let nameAndDomain = recipient.address.split('@');
                if (properties.allowedDomains.indexOf(nameAndDomain[1].toLowerCase()) > -1) {
                  db.collection('accounts').updateOne({"name": nameAndDomain[0]}, {
                    $push: {
                      "emails": {
                        "emailId": mail._id,
                        "sender": mail.from.value[0],
                        "subject": mail.subject,
                        "timestamp": mail._id.getTimestamp()
                      }
                    }
                  }, {upsert: true});
                }
                console.log("Inserted results into the collection.");
              });
            });
          });
          callback();
        });
      }
    });

    mailserver.on('error', err => {
      log.error('Error %s', err.message);
    });

//create data dir if doesn't exist
    fileHelper.createDir(dataDir);

    mailserver.listen(smtpPort);

    setInterval(fileHelper.deleteOldFilesAndDirectories.bind(null, dataDir, properties.emailDeleteAge),
      properties.emailDeleteInterval * 1000);

    return mailserver;
  }
}

function validateAddress(address, allowedDomains) {
  let allowed = false;

  allowedDomains.forEach(domain => {
    // console.log(JSON.stringify(address.address.split('@')[1].toLowerCase()));
    // console.log(JSON.stringify(domain));
    if (address.address.split('@')[1].toLowerCase().endsWith(domain.toLowerCase())) {

      allowed = true;
    }
  });
  log.info(allowed);
  return allowed;
}



