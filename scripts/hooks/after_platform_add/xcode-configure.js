#!/usr/bin/env node

// Configure Xcode project
module.exports = function(context) {

  const entitlements = 'E3F614351F06D7C50029FBE3'; // From /platforms/ios/App.xcodeproj/project.pbxproj
  const xcode = require('xcode');
  const fs = require('fs');
  const path = require('path');
  const utilities = require('../../utilities');
  const swift = require('./swift-support');
  const pods = require('./pod-install');

  const env = process.env.NODE_ENV || 'dev';
  console.log(`Environment = ${env}`);
  const config = getEnvConfig(env);
  // const isBuildServer = !!process.env.APP_BUILD_SERVER; // Export this env variable on your build server (set to true)
  const isBuildServer = false;

  const bundleId = config.bundleId;
  const projectName = config.projectName;
  const teamId = config.teamId;
  const provisioningProfile = config.provisioningProfile || null;
  const provisioningProfileSpecifier = config.provisioningProfileSpecifier || null;

  const projectRoot = path.join(__dirname, '..', '..', '..');
  const projectXcodeFile = projectName + '.xcodeproj';
  const projectPath = path.join(projectRoot, 'platforms', 'ios', projectXcodeFile, 'project.pbxproj');

  const platform = process.argv[4].split('@')[0];

  // Prevent script from running twice
  if (platform === 'ios' && fs.existsSync(projectPath)) {

    console.log('Configuring Xcode project...');

    // Copy entitilements file
    utilities.copyFile('App.entitlements', 'platforms/ios/' + projectName + '/' + projectName + '.entitlements');

    // Update xcodeproj file
    const xcodeProject = xcode.project(projectPath);
    if (xcodeProject) {
      xcodeProject.parseSync();
      const pbxProject = xcodeProject.hash.project.objects.PBXProject;
      Object.keys(pbxProject).forEach(key => {
        if (pbxProject[key]) {
          const configuration = pbxProject[key];
          if (configuration.attributes) {
            configuration.attributes.TargetAttributes = {
              '1D6058900D05DD3D006BFB54': { // From the XCBuildConfiguration section of project.pbxproj - should be the same for everyone
                DevelopmentTeam: teamId,
                LastSwiftMigration: '0830',
                SystemCapabilities: { // These should mirror what is in your custom App.entitlements file
                  'com.apple.ApplicationGroups.iOS': {
                    enabled: 1
                  },
                  'com.apple.Keychain': {
                    enabled: 1
                  }
                }
              }
            }
          }
        }
      });
      const configurations = xcodeProject.hash.project.objects.XCBuildConfiguration;
      Object.keys(configurations).forEach(key => {
        if (configurations[key]) {
          const configuration = configurations[key];
          if (configuration.buildSettings) {
            configuration.buildSettings.TARGETED_DEVICE_FAMILY = '1';
            configuration.buildSettings.PRODUCT_BUNDLE_IDENTIFIER = bundleId;
            configuration.buildSettings.PRODUCT_NAME = projectName;
            configuration.buildSettings.DEVELOPMENT_TEAM = teamId;
            configuration.buildSettings.IPHONEOS_DEPLOYMENT_TARGET = '10.0';
            configuration.buildSettings.CODE_SIGN_ENTITLEMENTS = projectName + '/' + projectName + '.entitlements';
            if (!isBuildServer) {
              configuration.buildSettings.CODE_SIGN_STYLE = 'Automatic';
              configuration.buildSettings.PROVISIONING_PROFILE = '""';
              configuration.buildSettings.PROVISIONING_PROFILE_SPECIFIER = '""';
            } else {
              if (provisioningProfile != null) {
                configuration.buildSettings.PROVISIONING_PROFILE = '"' + provisioningProfile + '"';
                configuration.buildSettings.PROVISIONING_PROFILE_SPECIFIER = '"' + provisioningProfileSpecifier + '"';
              }
            }
          }
        }
      });

      // Add Swift support to xCode project
      swift.addSwiftSupport(context, xcodeProject, () => {

        fs.writeFileSync(projectPath, xcodeProject.writeSync());

        // Load project file text
        let fileText = fs.readFileSync(projectPath, 'utf8');

        // Add entitlements file
        let insertAfter = '/* Begin PBXBuildFile section */';
        let insert = '\n		' + entitlements + ' /* ' + projectName + '.entitlements */ = {isa = PBXFileReference; lastKnownFileType =' + ' text.plist.entitlements; name = ' + projectName + '.entitlements; path = ' + projectName + '/' + projectName + '.entitlements; sourceTree = "<group>"; };';
        fileText = utilities.insertStringAfterString(insert, insertAfter, fileText);

        insertAfter = '/* CordovaLib.xcodeproj */,';
        insert = '\n				' + entitlements + ' /* ' + projectName + '.entitlements */,';
        fileText = utilities.insertStringAfterString(insert, insertAfter, fileText);

        fs.writeFileSync(projectPath, fileText, 'utf8');

        // Update App-Info.plist
        const infoPlistPath = path.join(projectRoot, 'platforms', 'ios', projectName, projectName + '-Info.plist');
        fileText = fs.readFileSync(infoPlistPath, 'utf8');
        fileText = utilities.replaceStringWithString('<string>com.russcarver.ionic4Template</string>', '<string>' + bundleId + '</string>', fileText);

        // Write file to output
        fs.writeFileSync(infoPlistPath, fileText, 'utf8');

        // Install pods
        pods.install();

        console.log('...done configuring Xcode project.');

      });

    }

  }

};

function getEnvConfig(env) {

  const iPhoneDeveloperCertOrganizationalUnit = '1234567'; // Your keychain certificate ID (can be found in Keychain Access under My Certificates)
  let config = {};

  config.projectName = process.env[`npm_package_config_app_name_${env}`];

  switch (env) {
    case 'prod':
      config.bundleId = 'com.russcarver.ionic4Template';
      config.teamId = iPhoneDeveloperCertOrganizationalUnit;
      config.provisioningProfile = 'lots-of-hex'; // The file name (minus '.mobileprovision') in /Users/<your.username>/Library/MobileDevice/Provisioning Profiles that matches your provisioning profile (see file contents)
      config.provisioningProfileSpecifier = 'App - Distribution';
      break;
    case 'test':
      config.bundleId = 'com.russcarver.ionic4Template';
      config.teamId = iPhoneDeveloperCertOrganizationalUnit;
      config.provisioningProfile = 'lots-of-hex';
      config.provisioningProfileSpecifier = 'App Test Region';
      break;
    case 'dev':
      config.bundleId = 'com.russcarver.ionic4Template';
      config.teamId = iPhoneDeveloperCertOrganizationalUnit;
      config.provisioningProfile = 'lots-of-hex';
      config.provisioningProfileSpecifier = 'App Dev Region';
      break;
    default:
      throw new Error(`NODE_ENV is invalid: ${env}. Should be 'dev', 'test' or 'prod'.`);
  }

  return config;

}
