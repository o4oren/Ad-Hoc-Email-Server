/* eslint no-console: 0 */

'use strict';
const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function sendTestEmail(properties) {

// Message object
  const recipientAddress = 'alive-test@' + properties.allowedDomains[0];

  const message = {
    // Comma separated list of recipients
    to: recipientAddress,

    // Subject of the message
    subject: 'AHEM mail test! ✔',

    // plaintext body
    text: 'API: ✔ SMTP: ✔ DB: ✔',

    // HTML body
    html:
    '<p><b>API Test:</b> <span style="color: darkgreen">✔</span></p>' +
    '<p><b>SMTP Test:</b> <span style="color: darkgreen">✔</span></p>' +
    '<p><b>DB Test:</b> <span style="color: darkgreen">✔</span></p>' +
    '<p><br/><img src="cid:ahem-tester@mydomain.com"/></p>',

    // An array of attachments
    attachments: [
      // File Stream attachment
      {
        filename: 'ahem-happy.png',
        path: __dirname + '/../../client/assets/images/happy.png',
        cid: 'ahem-tester@mydomain.com' // should be as unique as possible
      }
    ]
  };

  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport(
    {
      host: properties.host || 'localhost',
      port: properties.smtpPort,
      logger: true,
      debug: false // include SMTP traffic in the logs
    },
    {
      from: 'AHEM Test! <alive-test@' + properties.allowedDomains[0] + '>',
      headers: {
      }
    }
  );

  transporter.sendMail(message, (error, info) => {
    if (error) {
      throw error;
    }

    // only needed when using pooled connections
    transporter.close();
  });
}

module.exports.sendTestEmail = sendTestEmail;
