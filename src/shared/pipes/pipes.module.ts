import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CapitalizePipe } from './capitalize-pipe';
import { FormatIntoPriceCentsPipe } from './format-into-price-cents-pipe';
import { FormatIntoPricePipe } from './format-into-price-pipe';

const pipes: any = [
  CapitalizePipe,
  FormatIntoPriceCentsPipe,
  FormatIntoPricePipe
];

@NgModule({
  declarations: pipes,
  exports: pipes,
  imports: [IonicModule]
})

export class PipesModule {
}
