#!/usr/bin/env node

// Configure Android project

const fs = require('fs');
const replace = require('replace-in-file');
const path = require('path');
const utilities = require('../../utilities');
const os = require('os');

const EOL = os.EOL;

const env = process.env.NODE_ENV || 'dev';

const keyStoreFile = process.env.RELEASE_KEYSTORE_FILE;
const keyStorePassword = process.env.RELEASE_KEYSTORE_PASSWORD;
const keyAlias = process.env.RELEASE_KEY_ALIAS;
const keyPassword = process.env.RELEASE_KEY_PASSWORD;

const googlePlayServicesVersion = process.env.npm_package_config_google_play_services_version;
const projectRoot = path.join(__dirname, '..', '..', '..');
const projectPath = path.join(projectRoot, 'platforms', 'android');

const platform = process.argv[4].split('@')[0];

// Prevent script from running twice
if (platform === 'android' && fs.existsSync(projectPath)) {

  console.log('Configuring Android project...');

  setGooglePlayServicesVersion(googlePlayServicesVersion);

  // Copy firebase config to platform folder
  // utilities.copyFile(path.join('vendor', 'firebase', 'android', 'google-services.json'),
  //   path.join(projectPath, 'google-services.json'));

  // Configure android release signing properties
  if (env === 'prod') {
    console.log("Creating release signing property file...");
    createReleaseSigningProptertyFile();
  }

  // Configure android debug signing properties
  if (env !== 'prod') {
    utilities.copyFile('debug-signing.properties',
      path.join(projectPath, 'debug-signing.properties'));
    utilities.copyFile('debug.keystore',
      path.join(projectPath, 'debug.keystore'));
  }

  // Prevent split screen
  const manifestPath = path.join(projectPath, 'AndroidManifest.xml');
  fs.readFile(manifestPath, 'utf8', (err, fileText) => {
    if (err) {
      return console.log('Error reading file at ' + manifestPath + ': ' + err);
    }
    fileText = utilities.insertStringAfterString(' android:resizeableActivity="false"', '<application', fileText);
    fs.writeFileSync(manifestPath, fileText, 'utf8');
  });

  console.log('...done configuring Android project.');

}

function createReleaseSigningProptertyFile() {

  let logger = fs.createWriteStream(path.join(projectPath, 'release-signing.properties'), {
    encoding: 'utf8',
    flags: 'a'
  });

  logger.write(`storeFile=${keyStoreFile}${EOL}`);
  logger.write(`storePassword=${keyStorePassword}${EOL}`);
  logger.write(`keyAlias=${keyAlias}${EOL}`);
  logger.write(`keyPassword=${keyPassword}${EOL}`);
  logger.end();

}

function setGooglePlayServicesVersion(version) {

  // Update project.properties to use global Google Play Services version
  const options = {
    files: path.join(projectPath, 'project.properties'),
    from: /:\+/g,
    to: `:${version}`
  };

  replace.sync(options);

  // Update project.properties to use global Google Play Services version
  options.from = /:11.0.+/g;
  replace.sync(options);

}
