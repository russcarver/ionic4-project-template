import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'app/app.module';
import { isDev, isProd } from 'environments/index';

if (isDev()) {
  window.location.hash = '';
} else if (isProd()) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: any) => console.log(err)); // tslint:disable-line:no-console
