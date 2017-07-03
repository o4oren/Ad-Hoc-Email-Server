/**
 * Created by ogeva on 7/2/2017.
 */
var fs = require('fs');

module.exports = {
  createDir: function createDir(path) {
    var dir = path;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  },
  listFoldersForAutoComplete: function listFolders(prefix) {
    fs.readdir(testFolder, (err, files) => {
        files.reduce(file => {
          file.startsExpr(prefix);
        });
        return files;
      }
    )
  }
}


