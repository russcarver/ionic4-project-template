// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.dev.ts`, but if you do
// `ng build --configuration=production` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.
import { Environment } from 'environments/environment.model';

export const environment: any = {
  production: false
};

// Set these to a copy of the Test environment as these will be used by Jest (since no file overriding occurs)
export const environmentVariables: Environment = Object.assign({}, {}, {
  appName: 'Ionic4_Test',
  environmentName: 'Test Environment',
  httpTimeoutDefault: 30000,
  ionicEnvName: 'test',
  servicesPath: '/my-api',
  servicesUrl: 'http://test-url'
});
