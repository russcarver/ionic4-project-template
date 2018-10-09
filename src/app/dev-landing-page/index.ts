import { getPage } from 'app/dev-landing-page/get-page';
import { StorageService } from 'shared/services/storage';

let storageService: StorageService;
let envVars: any;

export function signIn(): void {
  // userProvider.setUser({
  //   creationTimestamp: 1502679277944,
  //   email: 'russell.carver@aristocrat.com',
  //   facebookId: '',
  //   firstName: 'Russ',
  //   id: 'asl934n00asjdh23',
  //   lastName: 'Carver',
  //   phone: '719-510-1525'
  // });
}

export function presetProfile(): void {
  // storageService.clearStorage() // Use only when needed
  // storageService.setValueForKey(storageType.key1, value1);
}

export function init(
  _storageService: StorageService,
  _envVars: any): void {

  if (_envVars.ionicEnvName !== 'dev') {
    return;
  }
  storageService = _storageService;
  envVars = _envVars;

  // Comment-out these two lines if you want to start at the default page
  // presetProfile();
  // signIn();
}

export default (): string => { // tslint:disable-line:no-default-export
  if (envVars.ionicEnvName !== 'dev') {
    return;
  }
  return getPage();
};
