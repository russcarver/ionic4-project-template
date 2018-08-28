import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';

import { isDefined, isUndefined } from 'lib/util';

const spinnerDelay: number = 2000; // ms
const maxSpinnerTime: number = 1800000; // 30 seconds
let spinnerDisplayPending: boolean = false;

/**
 * Each instance of this component is local only to where it is included in the HTML/Typescript.  It is NOT static across all instances.  However,
 * the 'spinnerDisplayPending' field is used across all instances.
 */
@Component({
  selector: 'cmp-loading-spinner',
  template: `<div></div>`
})
export class LoadingSpinnerComponent {
  private spinner: any; // TODO: Update to actual type (used to be "Loading"
  private spinnerPendingSubject: Subject<boolean> = new Subject<boolean>();

  /**
   * This method is used to determine if you need to disable any user controls while the spinner has not yet appeared.
   */
  public static isSpinnerPending(): boolean {
    return spinnerDisplayPending;
  }

  public constructor(private loadingController: LoadingController) { }

  /**
   * This method is also to determine if the spinner is pending but you may subscribe to the result to get notifications of the spinner becoming
   * pending or not.  This is helpful such as in Angular reactive forms where the inputs can't use the [disabled] attribute directly, but rather
   * the disabled state must be set on the form control in typscript.
   */
  public getSpinnerPending(): Observable<boolean> {
    return this.spinnerPendingSubject.asObservable();
  }

  /**
   * This will show the spinner after 2 seconds have elapsed. Once elapsed, it will show it only if no spinner is currently displayed and the pending
   * state has not been canceled by a dismiss.
   */
  public showSpinner(): void {
    this.setSpinnerPending(true);
    setTimeout(() => {
      if (spinnerDisplayPending && isUndefined(this.spinner)) {
        this.setSpinnerPending(false);
        this.createLoadingAnimation('loading-spinner-secondary');
        this.spinner.present();
      }
    }, spinnerDelay);
  }

  /* Shows the spinner immediately */
  public show(): void {
    this.setSpinnerPending(true);
    if (spinnerDisplayPending && isUndefined(this.spinner)) {
      this.setSpinnerPending(false);
      this.createLoadingAnimation('loading-spinner-secondary');
      this.spinner.present();
    }
  }

  /**
   * This will show the spinner immediately, for the duration specified.
   */
  public showSpinnerWithDuration(durationInMilliseconds: number, dismissCallback?: Function): void {
    this.setPending(true);
    this.presentSpinner(durationInMilliseconds, dismissCallback);
  }

  /**
   * This will cancel any pending spinner. And only dismiss a spinner that has been presented.
   */
  public dismiss(): void {
    if (spinnerDisplayPending) {
      this.setPending(false);
    }
    this.cleanup();
  }

  public cleanup(): void {
    if (isDefined(this.spinner)) {
      this.spinner.dismiss();
      this.spinner = undefined;
    }
  }

  private setPending(pending: boolean): void {
    spinnerDisplayPending = pending;
    this.spinnerPendingSubject.next(pending);
  }

  private setSpinnerPending(pending: boolean): void {
    spinnerDisplayPending = pending;
    this.spinnerPendingSubject.next(pending);
  }

  private createLoadingAnimation(componentDefinition: string, durationInMilliseconds: number = maxSpinnerTime): void {
    this.spinner = this.loadingController.create({
      content: `
        <div class="${componentDefinition}__container">
          <img src="assets/img/loadingicon.gif" class="${componentDefinition}__container_icon">
        </div>`,
      cssClass: componentDefinition,
      duration: durationInMilliseconds,
      showBackdrop: false,
      spinner: 'hide'
    });
  }

  private presentSpinner(durationInMilliseconds?: number, dismissCallback?: Function): void {
    if (spinnerDisplayPending && isUndefined(this.spinner)) {
      spinnerDisplayPending = false;
      this.createLoadingAnimation('loading-spinner-white', durationInMilliseconds);
      this.spinner.present();
      if (isDefined(dismissCallback)) {
        this.spinner.onDidDismiss(dismissCallback());
      }
    }
  }

}
