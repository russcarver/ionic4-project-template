import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertService } from 'shared/services/alert';
import { ApiService } from 'shared/services/api/api.service';
import { InjectorService } from 'shared/services/injector';
import { StorageService } from 'shared/services/storage';
import { ToastService } from 'shared/services/toast';

import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    AlertService,
    ApiService,
    InjectorService,
    StorageService,
    ToastService
  ]
})

export class SharedModule { }
