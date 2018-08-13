const createFile = require('../scripts/create-file');

const path = './src/app/dev-landing-page/get-page.ts';
let finalOutput = `import * as devLandingPage from 'app/dev-landing-page'; // tslint:disable-line:no-unused-import

export const getPage: Function = (): string => {
  // devLandingPage.presetProfile();
  // devLandingPage.signIn();
  return 'HomePage';
};
`;
// always create file with each builds
createFile(path, finalOutput);
