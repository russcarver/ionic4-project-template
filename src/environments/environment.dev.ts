// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --configuration=production` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.

import { getUseServiceUsageVars } from 'environments/environment-variables.module';
import { Environment } from 'environments/environment.model';

export const environment: any = {
  production: false
};

const serviceUsageVars: any = getUseServiceUsageVars();

export const environmentVariables: Environment = Object.assign({}, serviceUsageVars, {
  appName: 'Ionic4_Dev',
  environmentName: 'Development Environment',
  httpTimeoutDefault: 30000,
  ionicEnvName: 'dev',
  servicesPath: '/my-api',
  servicesUrl: 'http://dev-url'
});
