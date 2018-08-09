exports.insertStringAfterString = function(insertString, beforeString, fileText) {
  const beforeStringLocation = fileText.indexOf(beforeString);
  if (beforeStringLocation > -1) {
    const insertLocation = beforeStringLocation + beforeString.length;
    return fileText.slice(0, insertLocation) + insertString + fileText.slice(insertLocation);
  }
  return fileText;
};

exports.replaceStringWithString = function(oldString, newString, fileText) {
  const oldStringLocation = fileText.indexOf(oldString);
  if (oldStringLocation > -1) {
    const part1 = fileText.slice(0, oldStringLocation);
    const part2 = fileText.slice(oldStringLocation + oldString.length);
    return part1 + newString + part2;
  }
  return fileText;
};

exports.removeAllLinesWithString = function(string, fileText) {
  const inputFileAsArray = fileText.split('\n');
  const outputFileAsArray = [];
  inputFileAsArray.forEach(line => {
    if (line.indexOf(string) < 0) {
      outputFileAsArray.push(line);
    }
  });
  return outputFileAsArray.join('\n');
};

exports.removeCharacters = function(charactersToRemove, fileText) {
  while (fileText.indexOf(charactersToRemove) > -1) {
    fileText = exports.replaceStringWithString(charactersToRemove, '', fileText);
  }
  return fileText;
};

exports.copyFile = function(fromPath, toPath) {
  const fs = require('fs');
  if (fs.existsSync(fromPath)) {
    fs.createReadStream(fromPath).pipe(fs.createWriteStream(toPath), { flags: 'w' });
  }
};

exports.configFiles = ['package.json', 'package-lock.json'];
