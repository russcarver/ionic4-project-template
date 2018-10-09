#!/usr/bin/env node

// Pass in the argument of either 'major', 'minor' or 'patch' to increment the relative number

const fs = require('fs');
const xml2js = require('xml2js');

var appVersion;

// Read config.xml version
fs.readFile('config.xml', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Parse XML to JS Obj
  xml2js.parseString(data, function(err, result) {
    if (err) {
      return console.log(err);
    }

    const obj = result; // Get JS Object

    // Get app version
    appVersion = obj['widget']['$']['version'];
    console.log('Config.xml app version currently: ' + appVersion);

    // Increment Version
    let major = parseInt(appVersion.substr(0, appVersion.indexOf('.')));
    const majorLen = major.toString(10).length;
    let minor = parseInt(appVersion.substr(majorLen + 1, appVersion.indexOf('.', majorLen)));
    const minorLen = minor.toString(10).length;
    let patch = parseInt(appVersion.substr(minorLen + minorLen + 2));

    if (process.argv[2] === 'major') {
      major++;
    } else if (process.argv[2] === 'minor') {
      minor++;
    } else if (process.argv[2] === 'patch') {
      patch++;
    }

    const newVersion = major + '.' + minor + '.' + patch;
    obj['widget']['$']['version'] = newVersion;
    console.log('New version: ' + newVersion);

    // Build XML from JS Obj
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(obj);

    // Write config.xml
    fs.writeFile('config.xml', xml, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('Config.xml successfully updated');
    });
  });
});
