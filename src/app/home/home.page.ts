import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { isUndefined } from 'lib/util';

import { LoadingSpinnerComponent } from 'shared/components/loading-spinner/loading-spinner';
import { Messages } from 'shared/models';
import { AlertService } from 'shared/services/alert';
import { ApiService } from 'shared/services/api/api.service';

@Component({
  selector: 'cmp-home',
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.html'
})
export class HomePage implements OnDestroy, OnInit {
  @ViewChild('loadingSpinner') public loadingSpinner: LoadingSpinnerComponent;

  public foo: Object;

  private fooId: number;

  public constructor(private alertService: AlertService, private apiService: ApiService) { }

  public ngOnInit(): void {
    this.getFoo();
  }

  public ngOnDestroy(): void {
    this.loadingSpinner.cleanup();
  }

  private async getFoo(): Promise<void> {
    this.loadingSpinner.showSpinner();
    try {
      this.foo = await this.apiService.getFoo(this.fooId).toPromise();
    } catch (err) {
      if (isUndefined(this.foo)) {
        this.alertService.showOkAlert(Messages.fooApiError);
      }
    } finally {
      this.loadingSpinner.dismiss();
    }
  }
}
