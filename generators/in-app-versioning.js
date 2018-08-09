const createFile = require('../scripts/create-file');
const fs = require('fs');
const xml2js = require('xml2js');

var appVersion;

// Read config.xml version
fs.readFile('config.xml', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  // Parse XML to JS Obj
  xml2js.parseString(data, function (err, result) {
    if (err) {
      return console.log(err);
    }

    // Get app version
    appVersion = result['widget']['$']['version'];

    const versionCode = `export const appVersion: string = '${appVersion}'; // DO NOT Change! This is generated in the in-app-versioning.js script during pre-build (from config.xml)\n`;
    createFile('./src/app-version.ts', versionCode);
  });
});
