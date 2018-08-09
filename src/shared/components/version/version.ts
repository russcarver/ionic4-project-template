import { Component } from '@angular/core';

import { appVersion } from 'app-version';

@Component({
  selector: 'cmp-version',
  templateUrl: 'version.html'
})
export class VersionComponent {
  public appVersion: string = appVersion;
}
