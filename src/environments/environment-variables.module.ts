import { NgModule } from '@angular/core';

import { envVariables } from 'environments/environment-variables.token';
import { Environment } from 'environments/environment.model';
import { getEnvVars } from 'environments/index';

declare const process: any; // Typescript compiler will complain without this

export function getUseServiceUsageVars(): any { // This seems to only work as a function - not a const
  return {
    globalFlagForIncludingSomeFeature: false
  };
}

export function environmentFactory(): Environment {
  return getEnvVars();
}

@NgModule({
  providers: [
    {
      provide: envVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule { }
