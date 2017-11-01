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
                  db.collection('accounts').updateOne({"name": nameAndDomain[0]}, {$push: {"emails": mail._id}}, { upsert: true });
                }
                console.log("Inserted results into the collection.");
              });
            });


            ////////


            fileHelper.createDir(path.join(dataDir, name));
            fileName = fileHelper.createFileName(mail);
            filePath = path.join(dataDir, name, fileName);
            log.info('Writing ' + fileName + ' to: ', filePath);

            fs.writeFileSync(filePath, JSON.stringify(mail), 'utf-8');

            if (rcptTo.length > 1) {
              log.info("Multiple recipients");
              for (i = 1; i < rcptTo.length; i++) {
                let currentName = rcptTo[i].address.split('@')[0];
                log.info("recipient", currentName);
                fileHelper.createDir(path.join(dataDir, currentName));
                fs.symlinkSync(filePath, path.join(dataDir, currentName, fileName), callback);
              }
            }

            //TODO remove after solving TC issue
            let subject = mail.subject;
            if (subject.includes('Team Connect')) {
              log.info('TC mail data', mailDataString);
            }

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



