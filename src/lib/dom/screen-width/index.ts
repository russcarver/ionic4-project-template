import { isTest } from 'environments';

export default () => isTest() // tslint:disable-line
  ? 320
  : document.body.offsetWidth;
