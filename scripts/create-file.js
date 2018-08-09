const fs = require('fs');

module.exports = (file, content, cb) => {
  if (!content) {
    content = '';
  }
  fs.writeFile(file, content, err => {
    if (err) {
      return console.log(err);
    }
    if (cb) {
      cb();
    }
  });
};
