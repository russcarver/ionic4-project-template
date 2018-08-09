import { getUseServiceUsageVars } from 'environments/environment-variables.module';
import { Environment } from 'environments/environment.model';

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const environment: any = {
  production: true
};

const serviceUsageVars: any = getUseServiceUsageVars();

export const environmentVariables: Environment = Object.assign({}, serviceUsageVars, {
  appName: 'Ionic4_Test',
  environmentName: 'Test Environment',
  httpTimeoutDefault: 30000,
  ionicEnvName: 'test',
  servicesPath: '/my-api',
  servicesUrl: 'http://test-url'
});
