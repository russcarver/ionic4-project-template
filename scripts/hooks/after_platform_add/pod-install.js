#!/usr/bin/env node

// Configure pods
// For projects that contain podspecs, linkage errors can occur if the
// pods are not installed correctly. This hook installs all the pods
// after the platform has been added. Without this hook, linkage errors
// occur during the IOS build due to firebase libraries which are not
// found in the project. It fails even though cordova attempts to install
// the pods. However, a manual pod installation fixes the errors.

function install() {

  console.log('==> Installing pods...');

  const execSync = require('child_process').execSync;
  const path = require('path');

  const projectRoot = path.join(__dirname, '..', '..', '..');
  const platformPath = path.join(projectRoot, 'platforms', 'ios');

  execSync('pod init', { cwd: platformPath });
  execSync('pod install', { cwd: platformPath, stdio:[0,1,2] });

  console.log('==> Finished installing pods...');

}

module.exports = { install: install };
