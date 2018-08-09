#!/usr/bin/env node

// Dynamically generate index.html to add Content Security Protection for each environment.

const fs = require('fs');
const path = require('path');
const hookUtilities = require('./utilities');

const env = process.env.NODE_ENV || 'dev';
const baseUrl = process.env[`npm_package_config_app_baseurl_${env}`];
const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' ${baseUrl} data: gap: cdvfile: https://ssl.gstatic.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src 'self';">`;

const fileInPath = 'index.html';
const fileOutPath = path.join('src','index.html');

if (process.argv[2] === 'no-csp') {
  fs.createReadStream(fileInPath).pipe(fs.createWriteStream(fileOutPath));
} else {

  fs.readFile(fileInPath, 'utf8', (err, fileText) => {

    if (err) {
      console.log('Error reading file at ' + filePath + ": " + err);
    } else {
      fileText = hookUtilities.replaceStringWithString('<!--CSP-->', csp, fileText);
      fs.writeFileSync(fileOutPath, fileText, 'utf8');
      console.log('...done generating index.html.');
    }

  });

}
