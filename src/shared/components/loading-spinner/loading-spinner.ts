import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { isDefined, isUndefined } from 'lib/util';

import { Observable, Subject } from 'rxjs';

const spinnerDelay: number = 1000; // 1 second until we show spinner
const maxSpinnerTime: number = 1800000; // 30 seconds
let spinnerDisplayPending: boolean = false;

/**
 * Each instance of this component is local only to where it is included in the HTML/Typescript.  It is NOT static across all instances.  However,
 * the 'spinnerDisplayPending' field is used across all instances.
 */
@Component({
  selector: 'cmp-loading-spinner',
  template: '<div></div>'
})
export class LoadingSpinnerComponent {
  private spinner: HTMLIonLoadingElement;
  private spinnerPendingSubject: Subject<boolean> = new Subject<boolean>();

  /**
   * This method is used to determine if you need to disable any user controls while the spinner has not yet appeared.
   */
  public static isSpinnerPending(): boolean {
    return spinnerDisplayPending;
  }

  public constructor(private loadingController: LoadingController) {}

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
        this.createLoadingAnimation();
      }
    }, spinnerDelay);
  }

  /* Shows the spinner immediately */
  public show(): void {
    this.setSpinnerPending(true);
    if (spinnerDisplayPending && isUndefined(this.spinner)) {
      this.setSpinnerPending(false);
      this.createLoadingAnimation();
    }
  }

  /**
   * This will show the spinner immediately, for the duration specified.
   */
  public showSpinnerWithDuration(durationInMilliseconds: number): void {
    this.setPending(true);
    this.presentSpinner(durationInMilliseconds);
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

  private async createLoadingAnimation(durationInMilliseconds: number = maxSpinnerTime): Promise<void> {
    this.cleanup();
    this.spinner = await this.loadingController.create({
      cssClass: 'cmp-loading-spinner',
      duration: durationInMilliseconds,
      spinner: 'circles'
    });
    await this.spinner.present();
  }

  private presentSpinner(durationInMilliseconds?: number): void {
    if (spinnerDisplayPending && isUndefined(this.spinner)) {
      spinnerDisplayPending = false;
      this.createLoadingAnimation(durationInMilliseconds);
    }
  }
}
