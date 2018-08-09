import { Injectable } from '@angular/core';
import { Toast, ToastController, ToastOptions } from 'ionic-angular';

import { unset } from 'lodash';

import { Message } from 'shared/services/request/models/message.model';

interface ToastStatusOptions {
  duration: number; // Duration of zero is treated as infinite
}

@Injectable()
export class ToastService {
  private static readonly defaultDuration: number = 3000;
// The use of a Toast array is to display multiple toasts without them overlapping.  As one toast is dismissed, the other toast in the array will be displayed
  private toasts: Toast[] = [];

  public constructor(private toastCtrl: ToastController) { }

  public display(options: ToastOptions): void {
    if (options.duration === 0) {
      unset(options, 'duration');
    }
    const toast: Toast = this.toastCtrl.create(options);

    toast.onDidDismiss(() => {
      this.toasts.shift();
      if (this.toasts.length > 0) {
        this.show();
      }
    });

    this.toasts.push(toast);

    if (this.toasts.length === 1) {
      this.show();
    }
  }

  public displayError(message: string, options: ToastStatusOptions = { duration: ToastService.defaultDuration }): void {
    this.display({
      cssClass: 'toast-error',
      duration: options.duration,
      message: message,
      position: 'top'
    });
  }

  public displayInfo(message: string, options: ToastStatusOptions = { duration: ToastService.defaultDuration }): void {
    this.display({
      cssClass: 'toast-info',
      duration: options.duration,
      message: message,
      position: 'top'
    });
  }

  public displayMessages(messages: Message[]): void {
    messages.forEach((message: Message) => {

      switch (message.type) {

        case Message.messageTypeError:
          this.displayError(message.message);
          break;

        case Message.messageTypeInfo:
          this.displaySuccess(message.message);
          break;

        case Message.messageTypeWarn:
          this.displayWarn(message.message);
          break;

        default:
          throw new Error('Invalid Message Type!');
      }

    });

  }

  public displaySuccess(message: string, options: ToastStatusOptions = { duration: ToastService.defaultDuration }): void {
    this.display({
      cssClass: 'toast-success',
      duration: options.duration,
      message: message,
      position: 'top'
    });
  }

  public displayWarn(message: string, options: ToastStatusOptions = { duration: ToastService.defaultDuration }): void {
    this.display({
      cssClass: 'toast-warn',
      duration: options.duration,
      message: message,
      position: 'top'
    });
  }

  private createToastClickHandler(toast: Toast): void {
    const container: HTMLElement = <HTMLElement> document.querySelector('.toast-container');
    const listener: EventListenerOrEventListenerObject = (me: MouseEvent): void => {
      container.removeEventListener('click', listener, true);
      toast.dismiss();
    };
    container.addEventListener('click', listener);
  }

  private show(): void {
    this.toasts[0].present().then((): void => {
      this.createToastClickHandler(this.toasts[0]);
    });
  }

}
