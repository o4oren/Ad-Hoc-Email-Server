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
  listFoldersForAutoComplete: function listFolders(path, prefix) {
    let files = fs.readdirSync(path).filter(function(file) {
      if(file.startsWith(prefix))
        return file;
      }
    );

    return files;
  }
}



