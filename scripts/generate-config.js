#!/usr/bin/env node

// Update config.xml
// v1.0
// Automatically generate the config.xml and update ID and Name based on the target build environment
//
// Don't forget to install xml2js using npm
// `$ npm install xml2js`

const env = process.env.NODE_ENV || 'dev';

APP_NAME = process.env[`npm_package_config_app_name_${env}`];
PROD_APP_ID = 'com.russcarver.ionic4Template';
NON_PROD_APP_ID = 'com.russcarver.ionic4Template';

const fs = require('fs');
const xml2js = require('xml2js');

// Uncomment when you are using a build server that is setting the APP_VERSION process environment variable
// APP_VERSION = '1.0.0'; // Share App Version (android, ios)
// let appVersion = APP_VERSION;
// if (process.env.APP_VERSION) {
//   appVersion = process.env.APP_VERSION;
// }

let newAppName = APP_NAME;
let newAppID_Android = PROD_APP_ID;
let newAppID_IOS = PROD_APP_ID;

switch (env) {
  case 'prod':
  break;
  case 'dev':
  case 'test':
    // newAppID_Android = NON_PROD_APP_ID + '_' + env; // Android platform won't add with dashes
    // newAppID_IOS = NON_PROD_APP_ID + '-' + env;
  break;
  default:
    throw new Error(`NODE_ENV is invalid: ${env}. Should be 'dev', 'test' or 'prod'.`);
}

// Read config.xml
fs.readFile('config.xml', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  // Parse XML to JS Obj
  xml2js.parseString(data, function (err, result) {
    if (err) {
      return console.log(err);
    }

    // Get JS Obj
    const obj = result;

    // Set the new App Name and ID
    obj['widget']['$']['id'] = 'com.russcarver.ionic4Template';

    // Set respective platform package names
    obj['widget']['$']['android-packageName'] = newAppID_Android;
    obj['widget']['$']['ios-CFBundleIdentifier'] = newAppID_IOS;
    console.log('(id) android-packageName: ' + newAppID_Android);
    console.log('(id) ios-CFBundleIdentifier: ' + newAppID_IOS);

    // Uncomment when you are using a build server that is setting the APP_VERSION process environment variable
    // Set shared platform version
    // obj['widget']['$']['version'] = appVersion;
    // console.log('version: ' + appVersion);

    obj['widget']['name'] = newAppName;
    console.log('New Name: ' + newAppName);

    // Build XML from JS Obj
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(obj);

    // Write config.xml
    fs.writeFile('config.xml', xml, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('Config.xml successfully generated');

    });

  });

});
