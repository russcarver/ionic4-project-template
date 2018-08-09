import { environmentVariables } from 'environments/environment';
import { Environment } from 'environments/environment.model';

export function getEnvVars(): Environment {
  return environmentVariables;
}

export function isDev(): boolean {
  return environmentVariables
    ? environmentVariables.ionicEnvName === 'dev'
    : false;
}

export function isTest(): boolean {
  return environmentVariables
    ? environmentVariables.ionicEnvName === 'test'
    : false;
}

export function isProd(): boolean {
  return environmentVariables
    ? environmentVariables.ionicEnvName === 'prod'
    : true;
}
