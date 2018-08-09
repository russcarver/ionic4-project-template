import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { HomePageModule } from 'app/home/home.module';
import { isDev } from 'environments';
import { EnvironmentsModule } from 'environments/environment-variables.module';
import { InjectorService } from 'shared/services/injector/injector.service';
import { SharedModule } from 'shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export class AppErrorHandler implements ErrorHandler {
  public handleError(error: any): void {
    if (isDev()) {
      console.error(error); // tslint:disable-line
    }
  }
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EnvironmentsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    SharedModule,
    HomePageModule // From here down, import only pages that can be the first ones a user sees (as they shouldn't be lazy loaded)
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SplashScreen,
    StatusBar
  ]
})

export class AppModule { // tslint:disable-line:max-classes-per-file
  public constructor(private injector: Injector) {    // Create global Service Injector.
    InjectorService.injector = this.injector;
  }
}
