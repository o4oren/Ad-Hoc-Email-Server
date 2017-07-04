/**
 * Created by ogeva on 7/2/2017.
 */
const fs = require('fs');
const path = require('path');
const DELIMITER = '###';

module.exports = {
  parseJsonFile: (filePath)  => {
    return JSON.parse(fs.readFileSync(filePath));
  },

  createDir: function createDir(path) {
    var dir = path;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  },

  listFoldersForAutoComplete: function listFolders(path, prefix) {
    let files = fs.readdirSync(path).filter(function (file) {
        if (file.startsWith(prefix))
          return file;
      }
    );

    return files;
  },

  listFiles: (path) => {
    return fs.readdirSync(path);
  },

  createFileName: (mail) => {

    let address = mail.from ? mail.from.value[0].address : 'UNDEFINED';
    let subject = mail.subject || 'UNDEFINED';

    return Date.now().toString() + '###' + address + '###' + subject;

  },

  parseFileName: (fileName) => {

    parts = fileName.split(DELIMITER);

    let mailMetaData = {
      timestamp: parts[0],
      address: parts[1],
      subject: fileName.split(parts[1] + DELIMITER)[1]
    }
    return mailMetaData;
  },

  getFileContents: (dir, fileName) => {

    return JSON.parse(fs.readFileSync(path.join(dir, fileName), 'utf8'));
  },

  fs,
  path
}



