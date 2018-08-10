#!/usr/bin/env node

// Update /platforms/ios/App/App-Info.plist
// v1.0
// Adds default values for the Privacy – Health Share Usage Description and Privacy – Health Update Usage Description in the App-info.plist file.
//
// Don't forget to install plist using npm: `$ npm install plist`

const fs = require('fs');
const plist = require('plist');

const env = process.env.NODE_ENV || 'dev';
const appName = process.env[`npm_package_config_app_name_${env}`];

const PLATFORM = './platforms/ios/';
const FILEPATH = PLATFORM + appName + '/' + appName + '-Info.plist';

console.log('Updating ' + FILEPATH);

let xml = fs.readFileSync(FILEPATH, 'utf8');
const obj = plist.parse(xml);

// Add ATS support - no need to add the local excepted domains as they are added by Ionic
// https://www.nowsecure.com/blog/2017/08/31/security-analysts-guide-nsapptransportsecurity-nsallowsarbitraryloads-app-transport-security-ats-exceptions/
obj.NSAppTransportSecurity.NSAllowsArbitraryLoads = false;

xml = plist.build(obj);
fs.writeFileSync(FILEPATH, xml, { encoding: 'utf8' });

console.log(FILEPATH + ' successfully updated');
