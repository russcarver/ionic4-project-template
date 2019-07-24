import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Config, DomController, MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { AppErrorHandler } from 'app/app.module';
import { EnvironmentsModule } from 'environments/environment-variables.module';
import noop from 'lib/noop';
import { ConfigMock, PlatformMock, StorageServiceMock } from 'mocks';
import { StorageService } from 'shared/services/storage';
import { TestBedComponentOverride, TestBedOverride, TestBedOverrideType, TestBedProviderOverride } from 'test-base-ext';

export interface FixturePayload<T> {
  fixture: ComponentFixture<T>;
  instance: T;
}

// https://github.com/lathonez/clicker/blob/master/src/test.ts
export class TestUtils {
  public static beforeEachCompiler(
    component: any,
    providers: Array<any> = [],
    imports: Array<any> = [],
    declarations: Array<any> = [],
    overrides: TestBedOverride<any>[] = []): Promise<{ fixture: ComponentFixture<typeof component>; instance: typeof component }> {
    return beforeEachCompiler(component, providers, imports, declarations, overrides);
  }
}

export function beforeEachCompiler(
  component: any,
  providers: Array<any> = [],
  imports: Array<any> = [],
  declarations: Array<any> = [],
  overrides: TestBedOverride<any>[] = []
): Promise<{ fixture: ComponentFixture<typeof component>; instance: typeof component }> {

  if (Array.isArray(component)) {
    component = component[0];
  }

  let configuredModule: typeof TestBed = configureIonicTestingModule(providers, imports, declarations);

  if (overrides.length) {
    overrides.forEach((override: TestBedOverride<any>): void => {
      switch (override.type) {
        case TestBedOverrideType.PROVIDER: {
          const data: TestBedProviderOverride = override.data as TestBedProviderOverride;
          const provider: any = data.providerFactory ? data.providerFactory : data.providerValue;
          configuredModule = configuredModule.overrideProvider(data.token, provider);
        }
          break;
        case TestBedOverrideType.COMPONENT: {
          const data: TestBedComponentOverride = override.data as TestBedComponentOverride;
          configuredModule = configuredModule.overrideComponent(data.token, data.override);
        }
          break;
        default:
          throw new Error(`Invalid override: ${override.type}`);
      }
    }, this); // tslint:disable-line
  }

  return configuredModule.compileComponents().then(() => {
    const fixture: ComponentFixture<typeof component> = TestBed.createComponent(component);
    return {
      fixture: fixture,
      instance: fixture.componentInstance
    };
  });

}

export function beforeEachProviderCompiler(providers: Array<any>, imports?: Array<any>): typeof TestBed {
  return configureIonicTestingModule(providers, imports);
}

function configureIonicTestingModule(mockProviders: Array<any> = [], imports: Array<any> = [], declarations: Array<any> = []): typeof TestBed {
  mockProviders = [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    Injector, DomController, MenuController, NavController, ModalController,
    { provide: StorageService, useClass: StorageServiceMock },
    { provide: Platform, useClass: PlatformMock },
    { provide: Config, useClass: ConfigMock }
  ].concat(mockProviders);

  imports = [
    EnvironmentsModule,
    HttpClientModule,
    HttpClientTestingModule
  ].concat(imports);

  return TestBed.configureTestingModule({
    declarations: declarations,
    imports: imports,
    providers: mockProviders,
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
  });
}

// http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
export function fireEvent(el: any, etype: string): void {
  if (el.fireEvent) {
    el.fireEvent(`on${etype}`);
  } else {
    const evObj: any = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

/**
 * Used to provide an override of "createSpyObj" in Jasmine which is not visible in Jest so that we can use ionic-mocks.
 * https://stackoverflow.com/questions/45304270/jest-createspyobj
 * https://github.com/stonelasley/ionic-mocks
 */
export function createSpyObj(baseName: string, methodNames: string[]): { [key: string]: jasmine.Spy } {
  const obj: { [key: string]: jasmine.Spy } = {};
  for (let i: number = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jasmine.createSpy(baseName, noop);
  }
  return obj;
}
