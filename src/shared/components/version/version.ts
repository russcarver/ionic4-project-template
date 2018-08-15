import { Component, ViewEncapsulation } from '@angular/core';

import { appVersion } from 'app-version';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'cmp-version',
  styleUrls: ['version.scss'],
  templateUrl: 'version.html'
})
export class VersionComponent {
  public appVersion: string = appVersion;
}
