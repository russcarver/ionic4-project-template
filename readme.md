# Ionic 4 project template
This project will evolve as Angular and Ionic evolve, but for now it's a good scaffolding for dev, test and production environments with a Jest 
unit test environment, a base class for HTTP requests, a custom loading spinner (just add your animated GIF to assets/img/loadingicon.gif), dynamic
 versioning (plus a component!), a cross-platform status bar, a custom toast controller, an HTML5 storage provider, some pipes, useful libraries, 
 platform configurations and more!
 
## Setup

### Set up NPM
  1. Install Node and NPM per your OS.

### Install Node Version Manager
  1. Install nvm `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
  1. Install avn `npm install -g avn avn-nvm avn-n` and then `avn setup`
  1. Use nvm to install node 10.16.0 `nvm install 10.16.0`
  1. Update npm to 6.9.0 `npm install npm@6.9.0`
  1. If wanted, set your default node version to 10.16.0 via `nvm alias default 10.16.0`

### Ionic & Cordova Dev Usage
 - Since we may be bouncing between versions of Ionic & Cordova, we're not installing these globally. They're in the `package.json` file.
 - Update your `PATH` to include `./node_modules/bin` (`export PATH=./node_modules/.bin:$PATH`).
 - Be sure Ionic and Cordova are not installed globally.

### Install Dependencies
 - From the root of project folder, type: `npm install`
 - For iOS:
   1. You will need to have XCode installed to be able to publish the app to the Apple Store.
   1. Install ios-deploy `npm install -g ios-deploy`
   1. Install ios-sim `npm install -g ios-sim`
 - For Android: See "Configuring the project for Android," below.

### Configure the Project in Xcode

We have a hook to do this, so manual configuration isn't necessary. However, for reference, here are the changes the hook makes:

 - Selects a development team. (You may still have to do this depending on your config.)
 - Turns on **App Groups** and **Keychain Sharing** in the Xcode **Capabilities** tab.
 - Changes the bundle ID to `com.<your-company>.<your-project>-<env>`

### Configure the Project for Android

   1. Install the [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). This is currently tested through `jdk1.8.0_172` as of 12/18/2017 Android does not yet support Java 9.
   1. Install [Android Studio](https://developer.android.com/studio/index.html).
   1. Make sure your environment variables are set up. Open your `.bash_profile` file (located in your home directory) and add the following:

    # Java
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_172.jdk/Contents/Home
    export PATH=$PATH:$JAVA_HOME/bin

    # Android
    export ANDROID_HOME=~/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools
    
    # Gradle
    export export GRADLE_USER_HOME=/Applications/Android Studio.app/Contents/gradle/gradle-4.4
    export PATH=$PATH:$GRADLE_USER_HOME/bin

   1. Launch Android Studio, choose **Tools > Android > SDK Manager**, and download one or more SDK platforms (for example, **Android 7.1.1 (Nougat)**). Note the path to the **Android SDK Location** on your computer (e.g., `/Users/jdoe/Library/Android/sdk`).
   1. In the same window, click the **SDK Tools** tab and install **Android Support Repository**, **Google Play Services**, **Google Repository**, and **Google Play APK Expansion library**.
   1. If you want to test in an emulator, choose **Tools > Android > AVD Manager** and create one or more virtual devices.

### Install Plugins & Platforms
 - From the root of the project folder, type:
   1. `npm run add-md-dev` or `npm run add-md-prod`
   1. `npm run add-ios-dev` or `npm run add-ios-prod`

## Building the Project
To build the project, type one of the following commands:

    npm run build-ios-test // iOS
    npm run build-ios-dev // iOS
    npm run build-ios-prod // iOS
    npm run build-md-test // Android
    npm run build-md-dev // Android
    npm run build-md-prod // Android

## Running the Project
 - To run the project in a browser, type: `npm start`.
 - To run the project in Xcode, build the project (see above), open the `.xcworkspace` file in `<proj-root>/platforms/ios/` into Xcode and then choose **Product > Run**.
 - To run the project on an Android device or simulator, type: `npm run run-md-dev` or `npm run run-md-test`.

## Dev Landing Page
- You can use the `src/app/dev-landing-page/get-page.ts` file to force the app to load a particular page in the dev environment. This can be useful for development and troubleshooting.
- The `get-page.ts` file is ignored by git. A local copy is created when you run `npm start`. To make it load a particular page, uncomment the body of the default method and enter the page name (as a string) there.

## Test and Coverage with Jest
 - If not installed already, run `brew install watchman`
 - The first time running tests, make sure you have no javascript files in your project that are compiled from typescript
 - To run all the tests once, use `npm run test`
 - To run tests for only files that have changed, use `npm run test-changed`
 - To run and watch tests, use `npm test-watch`
 - During the watch, there is a runtime option for specifying a file.  Type `p` and start typing your file name.
 - With the latest Jest (24+) coverage percentages can be seen only by viewing `coverage/lcov-report/index.html`.

## Troubleshooting Android

If you get an `Error: spawn EACCES` error running or building the android version, your gradle executable may not have executable permissions.
 1. Go to `/Applications/Android Studio.app/Contents/gradle/gradle-4.x/bin` and check the `gradle` file. Add executable permissions (`chmod 755 
 gradle`) if it does not have them.

## Troubleshooting iOS

If you encounter the "White Screen of Death," try the following steps. Rebuild the app (`npm run build-whatever`) after each step to see if the problem is fixed.
 1. Run `npm install`.
 1. Delete the app from the device or simulator.
 1. In the Xcode **Capabilities** tab, make sure **App Groups** and **Keychain Sharing** are turned on, and verify that the bundle ID is set to one that works with your downloaded certificate profile.
 1. In Xcode, hold down the Option key and choose **Product > Clean Build Folder**.
 1. Delete the contents of the following folders:
  - `<project-root>/www`
  - `<project-root>/platforms/ios/www`
 1. If you are running the app in iOS Simulator, choose **Simulator > Reset Content and Settings**.

If none of the above work, rebuild the Xcode project:

 1. Delete the contents of the `<project-root>/platforms` folder.
 1. Run `npm run add-ios-dev`, `npm run add-ios-test`, or `npm run add-ios-prod`
 1. Build your project as before

## Code Style
 - This project uses the [Angular Style Guide](https://angular.io/guide/styleguide)
