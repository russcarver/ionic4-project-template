import { Environment } from './environment.model';
import { getEnvVars, isDev, isProd, isTest } from './index';

declare const window: any;
window.getEnvVars = getEnvVars;

describe('Environments', () => {

  // This is the only test as no environment file overwriting occurs during the Jest test process
  it('should set the appropriate variables for the test environment', () => {

    const devEnv: Environment = getEnvVars();
    expect(devEnv.appName).toBe('Ionic4_Test');
    expect(devEnv.environmentName).toBe('Test Environment');
    expect(devEnv.httpTimeoutDefault).toBe(30000);
    expect(devEnv.ionicEnvName).toBe('test');
    expect(devEnv.servicesPath).toBe('/my-api');
    expect(devEnv.servicesUrl).toBe('http://test-url');
    expect(isDev()).toBeFalsy();
    expect(isTest()).toBeTruthy();
    expect(isProd()).toBeFalsy();
  });

});
