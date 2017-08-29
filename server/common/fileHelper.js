/**
 * Created by ogeva on 7/2/2017.
 */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const DELIMITER = '##^@#';

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

  getFileOrFolderNameByPrefix: function listFolders(path, prefix) {
    let files = fs.readdirSync(path).filter(function (file) {
        if (file.toLowerCase().startsWith(prefix.toLowerCase()))
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

    return Date.now().toString() + DELIMITER + address + DELIMITER + subject;

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

  /**
   * returns a JSON representing the file contents
   * @param dir
   * @param fileName
   */
  getFileContents: (dir, fileName) => {
    return JSON.parse(fs.readFileSync(path.join(dir, fileName), 'utf8'));
  },

  fs,
  path,

  deleteFile: (filePath) => {
    return rimraf(filePath, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('deleted ' + filePath);
    });
  },

  /**
   * Deletes files and directories older than the age passed in seconds
   * @param dir
   * @param age in seconds
   */
  deleteOldFilesAndDirectories: function deleteOldFilesAndDirectories(dir, age) {
    let  now = new Date().getTime();
    console.log('checking delete candidates in ' + dir);
    fs.readdir(dir, function(err, files) {
      files.forEach((file, index) => {
        let currentPath =  path.join(dir, file);
        fs.lstat(currentPath, (err, stat) => {
          var endTime;
          if (err) {
            console.error(err);
          } else {
            endTime = new Date(stat.ctime).getTime() + (age * 1000);
            if (now > endTime) {
              return rimraf(currentPath, function (err) {
                if (err) {
                  console.error(err);
                }
                console.log('deleted ' + file);
              });
            }
            if (fs.existsSync(currentPath)) {
              fs.lstat(currentPath, function (err, stats) {
                if (err) {
                  console.error(err);
                } else if (stats.isDirectory()) {
                  deleteOldFilesAndDirectories(currentPath, age);
                }
              });
            }
          }
        });
      });
    });
  },

  emptyDirectory: function emptyDirectory(dir) {
    fs.readdir(dir, function(err, files) {
      files.forEach((file, index) => {
        deleteFile(file);
      });
    })
  }
}



