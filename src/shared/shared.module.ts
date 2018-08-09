import { NgModule } from '@angular/core';

import { InjectorService } from 'shared/services/injector';
import { StorageService } from 'shared/services/storage';
import { ToastService } from 'shared/services/toast';

import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    PipesModule
  ],
  providers: [
    InjectorService,
    StorageService,
    ToastService
  ]
})

export class SharedModule { }
