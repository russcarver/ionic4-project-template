import { Component } from '@angular/core';

@Component({
  selector: 'cmp-status-bar',
  template: ''
})
export class StatusBarComponent {
  public static readonly height: number = 20; // If updated, make sure to update css variable `--status-bar__height` in status-bar.scss
}
