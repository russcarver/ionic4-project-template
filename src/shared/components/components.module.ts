import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoadingSpinnerComponent } from 'shared/components/loading-spinner/loading-spinner';
import { VersionComponent } from 'shared/components/version/version';
import { PipesModule } from 'shared/pipes/pipes.module';

const components: any = [
  LoadingSpinnerComponent,
  VersionComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, IonicModule, PipesModule]
})

export class ComponentsModule {
}
