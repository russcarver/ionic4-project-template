import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'shared/components/components.module';

import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        component: HomePage,
        path: ''
      }
    ])
  ]
})

export class HomePageModule {
}
