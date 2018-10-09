import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'cmp-version',
  styleUrls: ['version.scss'],
  templateUrl: 'version.html'
})
export class VersionComponent implements AfterViewInit {
  public appVer: string;

  private readonly defaultAppVer: string = '0.0.0';

  public constructor(private appVersion: AppVersion, private platform: Platform) {}

  public async ngAfterViewInit(): Promise<void> {
    this.appVer = this.defaultAppVer;

    await this.platform.ready();
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.appVer = await this.appVersion.getVersionNumber();
      if (this.appVer === '0') { // Happens occsionally on web builds
        this.appVer = this.defaultAppVer;
      }
    }
  }
}
