import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertService {
  public constructor(private alertController: AlertController) {}

  public async showOkAlert(message: string): Promise<void> {
    const alert: any = await this.alertController.create({
      buttons: ['OK'],
      header: 'Alert',
      message: message
    });
    alert.present();
  }
}
