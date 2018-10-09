import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { isDefined } from 'lib/util';

@Component({
  selector: 'cmp-header-back-button',
  templateUrl: 'header-back-button.html'
})
export class HeaderBackButtonComponent {
  public returnHandler: Function;

  public constructor(
    private navCtrl: NavController
  ) {}

  public onBackPressed(): void {
    if (isDefined(this.returnHandler)) {
      this.returnHandler();
      return;
    }
    this.navCtrl.navigateBack(''); // TODO: Pass in as @Input
  }
}
