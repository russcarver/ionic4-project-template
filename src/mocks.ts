import { Observable, of, timer } from 'rxjs';

import { createSpyObj } from 'test-base';

export class ToastMock { // tslint:disable:max-classes-per-file
  public static instance(): any {
    const instance: any = createSpyObj('Toast', ['present', 'dismissAll', 'onDidDismiss', 'setContent', 'setSpinner']);
    instance.present.and.returnValue(Promise.resolve());
    return instance;
  }
}

export class ToastControllerMock { // tslint:disable:max-classes-per-file
  public static instance(toast?: ToastMock): any {
    const instance: any = createSpyObj('ToastController', ['create']);
    instance.create.and.returnValue(toast || ToastMock.instance());
    return instance;
  }
}

export class ConfigMock { // tslint:disable:max-classes-per-file
  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }

  public setTransition(): void {
    return;
  }

  public setModeConfig(modeName: string, modeConfig: any): void {
    return;
  }
}

export class FormMock { // tslint:disable:max-classes-per-file
  public register(): any {
    return true;
  }
}

export class NavMock { // tslint:disable:max-classes-per-file
  public pop(): any {
    return new Promise((resolve: Function): void => {
      resolve();
    });
  }

  public push(): any {
    return new Promise((resolve: Function): void => {
      resolve();
    });
  }

  public getActive(): any {
    return {
      // tslint:disable
      'instance': {
        'model': 'something'
      }
      // tslint:enable
    };
  }

  public setRoot(): any {
    return true;
  }

  public popToRoot(): any {
    return true;
  }
}

export class PlatformMock { // tslint:disable:max-classes-per-file
  public ready(): Promise<String> {
    return new Promise((resolve: Function): void => {
      resolve('READY');
    });
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return ((): boolean => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(platform: string): boolean {
    return platform !== 'cordova';
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingBottom: '10',
      paddingLeft: '10',
      paddingRight: '10',
      paddingTop: '10'
    };
  }

  public onResize(callback: Function): Function {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return ((): boolean => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, _timer: number): any {
    return setTimeout(callback, _timer);
  }

  public cancelTimeout(id: any): void {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement']; // tslint:disable-line
  }
}

export class StorageMock { // tslint:disable:max-classes-per-file

  public get(key: string): Promise<{}> {
    return new Promise((resolve: Function): void => {
      resolve({});
    });
  }

  public set(key: string, value: string): Promise<{}> {
    return new Promise((resolve: Function): void => {
      resolve({ key: key, value: value });
    });
  }

  public remove(key: string): Promise<{}> {
    return new Promise((resolve: Function): void => {
      resolve({ key: key });
    });
  }

  public query(): Promise<{ res: { rows: Array<{}> } }> {
    return new Promise((resolve: Function): void => {
      resolve({
        res: {
          rows: [{}]
        }
      });
    });
  }
}

export class StorageServiceMock { // tslint:disable:max-classes-per-file
  public getValueForKey(key: string, callback: any): any {
    callback();
  }

  public getValueForAllKeys(keys: string[], callback: Function): void {
    callback();
  }

  public setValueForKey(value: any, key: string): void {
    return;
  }

}

export class MenuMock { // tslint:disable:max-classes-per-file
  public close(): any {
    return new Promise((resolve: Function): void => {
      resolve();
    });
  }
}

export class AppMock { // tslint:disable:max-classes-per-file
  public getActiveNav(): NavMock {
    return new NavMock();
  }
}

class AlertMock { // tslint:disable:max-classes-per-file
  public static instance(): any {
    const instance: any = createSpyObj('Alert', ['present', 'dismiss']);
    instance.present.and.returnValue(Promise.resolve());
    instance.dismiss.and.returnValue(Promise.resolve());

    return instance;
  }
}

export class AlertControllerMock { // tslint:disable:max-classes-per-file
  public static instance(alertMock?: AlertMock): any {

    const instance: any = createSpyObj('AlertController', ['create']);
    instance.create.and.returnValue(alertMock || AlertMock.instance());

    return instance;
  }
}

export class ModalMock {
  public static instance(): any {
    let _dismissCallback: Function;
    const instance: any = createSpyObj('Modal', ['present', 'dismiss', 'onDidDismiss']);
    instance.present.and.returnValue(Promise.resolve());

    instance.dismiss.and.callFake(() => {
      _dismissCallback();
      return Promise.resolve();
    });

    instance.onDidDismiss.and.callFake((callback: Function) => {
      _dismissCallback = callback;
    });

    return instance;
  }
}

export class ModalControllerMock {
  public static instance(modalMock?: ModalMock): any {
    const instance: any = createSpyObj('ModalController', ['create']);
    instance.create.and.returnValue(modalMock || ModalMock.instance());

    return instance;
  }
}

export class MockKeyboard { // tslint:disable:max-classes-per-file
  public hideKeyboardAccessoryBar(): void {
    //
  }

  public show(): void {
    //
  }

  public close(): void {
    //
  }

  public disableScroll(): void {
    //
  }

  public onKeyboardShow(): Observable<any> {
    return timer(1);
  }

  public onKeyboardHide(): Observable<any> {
    return timer(1);
  }

}

export class LoadingMock {
  public static instance(): { [key: string]: jasmine.Spy } {
    const instance: { [key: string]: jasmine.Spy } = createSpyObj('Loading', ['present', 'dismiss', 'onDidDismiss', 'setContent', 'setSpinner']);
    instance.present.and.returnValue(Promise.resolve());

    return instance;
  }
}

export class LoadingControllerMock {
  public static instance(loading?: LoadingMock): any {

    const instance: { [key: string]: jasmine.Spy } = createSpyObj('LoadingController', ['create']);
    instance.create.and.returnValue(loading || LoadingMock.instance());

    return instance;
  }
}

export class NavParamsMock {
  public static instance(getReturn?: any): any {
    const instance: any = createSpyObj('NavParams', ['get']);
    instance.get.and.returnValue(getReturn);

    return instance;
  }

  public get(): string {
    return '';
  }
}

export class ViewControllerMock {
  private static staticInstance: any = null;

  // HACK- https://github.com/stonelasley/ionic-mocks/issues/29
  private static navController(): any {
    const instance: any = createSpyObj('NavController', [
      'navigateBack',
      'navigateForward',
      'navigateRoot',
      'initPane',
      'paneChanged',
      'insert',
      'insertPage',
      'remove',
      'removeView',
      'setRoot',
      'setPages',
      'hasChildren',
      'getActiveChildNav',
      'registerChildNav',
      'unregisterChildNav',
      'destroy',
      'swipeBackStart',
      'swipeBackProgress',
      'swipeBackEnd',
      'canSwipeBack',
      'canGoBack',
      'isTransitioning',
      'setTransitioning',
      'getActive',
      'isActive',
      'getByIndex',
      'getPrevious',
      'first',
      'last',
      'indexOf',
      'length',
      'getViews',
      'isSwipeBackEnabled',
      'dismissPageChangeViews',
      'setViewPort',
      'resize',
      'viewDidEnter',
      'viewDidLeave',
      'viewDidLoad',
      'viewWillEnter',
      'viewWillLeave',
      'viewWillUnload'
    ]);

    instance.navigateRoot.and.returnValue(Promise.resolve());
    instance.initPane.and.returnValue(1);

    // tslint:disable:no-string-literal
    instance['root'] = ViewControllerMock.instance();
    instance['rootParams'] = {};
    // tslint:enable:no-string-literal

    instance.navigateForward.and.returnValue(Promise.resolve());
    instance.insert.and.returnValue(Promise.resolve());
    instance.insertPage.and.returnValue(Promise.resolve());
    instance.navigateBack.and.returnValue(Promise.resolve());
    instance.remove.and.returnValue(Promise.resolve());
    instance.removeView.and.returnValue(Promise.resolve());
    instance.setRoot.and.returnValue(Promise.resolve());
    instance.setPages.and.returnValue(Promise.resolve());
    instance.hasChildren.and.returnValue(true);
    instance.canSwipeBack.and.returnValue(true);
    instance.canGoBack.and.returnValue(true);
    instance.isTransitioning.and.returnValue(false);
    instance.getActive.and.returnValue({});
    instance.isActive.and.returnValue(true);
    instance.getByIndex.and.returnValue();
    instance.getPrevious.and.returnValue();
    instance.first.and.returnValue({});
    instance.last.and.returnValue({});
    instance.indexOf.and.returnValue(0);
    instance.length.and.returnValue(0);
    instance.getViews.and.returnValue([]);
    instance.isSwipeBackEnabled.and.returnValue(true);
    instance.viewDidEnter = of();
    instance.viewDidLeave = of();
    instance.viewDidLoad = of();
    instance.viewWillEnter = of();
    instance.viewWillLeave = of();
    instance.viewWillUnload = of();
  }

  public static instance(): any {

    const instance: any = createSpyObj('ViewController', [
      'willEnter',
      'didEnter',
      'willLeave',
      'didLeave',
      'willUnload',
      'didUnload',
      'dismiss',
      'onDidDismiss',
      'onWillDismiss',
      'enableBack',
      'isFirst',
      'isLast',
      'pageRef',
      'getContent',
      'contentRef',
      'hasNavbar',
      'index',
      'subscribe',
      'getNav',
      'getIONContent',
      'writeReady',
      'readReady',
      'setBackButtonText',
      'showBackButton',
      '_setHeader',
      '_setNavbar',
      '_setNav',
      '_setInstance',
      '_setIONContent',
      '_setContent',
      '_setContentRef',
      '_setFooter',
      '_setIONContentRef'
    ]);

    instance.willEnter.and.returnValue(of({}));
    instance.didEnter.and.returnValue(of({}));
    instance.willLeave.and.returnValue(of({}));
    instance.didLeave.and.returnValue(of({}));
    instance.willUnload.and.returnValue(of({}));
    instance.didUnload.and.returnValue(of({}));
    instance.dismiss.and.returnValue(Promise.resolve());
    instance.onDidDismiss.and.returnValue(Promise.resolve());
    instance.onWillDismiss.and.returnValue(Promise.resolve());
    instance.enableBack.and.returnValue(true);
    instance.isFirst.and.returnValue(false);
    instance.isLast.and.returnValue(false);
    instance.pageRef.and.returnValue({});
    instance.getContent.and.returnValue({});
    instance.contentRef.and.returnValue(Promise.resolve());
    instance.hasNavbar.and.returnValue(true);
    instance.index.and.returnValue(true);
    instance.subscribe.and.returnValue(of({}));
    instance.getNav.and.returnValue({});
    instance.getIONContent.and.returnValue({});

    instance['writeReady'] = { // tslint:disable-line:no-string-literal
      emit(): void {
        //
      },
      subscribe(): any {
        //
      }
    };

    instance['readReady'] = { // tslint:disable-line:no-string-literal
      emit(): void {
        //
      },
      subscribe(): any {
        //
      }
    };

    // tslint:disable:no-string-literal
    instance['component'] = {};
    instance['data'] = NavParamsMock.instance();
    instance['instance'] = {};
    instance['id'] = '';
    // tslint:enable:no-string-literal

    return instance;
  }
}

export class NavControllerMock {

  public static instance(): any {

    const instance: any = createSpyObj('NavController', [
      'navigateBack',
      'navigateForward',
      'navigateRoot',
      'initPane',
      'paneChanged',
      'insert',
      'insertPage',
      'remove',
      'removeView',
      'setRoot',
      'setPages',
      'hasChildren',
      'getActiveChildNav',
      'registerChildNav',
      'unregisterChildNav',
      'destroy',
      'swipeBackStart',
      'swipeBackProgress',
      'swipeBackEnd',
      'canSwipeBack',
      'canGoBack',
      'isTransitioning',
      'setTransitioning',
      'getActive',
      'isActive',
      'getByIndex',
      'getPrevious',
      'first',
      'last',
      'indexOf',
      'length',
      'getViews',
      'isSwipeBackEnabled',
      'dismissPageChangeViews',
      'setViewPort',
      'resize',
      'viewDidEnter',
      'viewDidLeave',
      'viewDidLoad',
      'viewWillEnter',
      'viewWillLeave',
      'viewWillUnload'
    ]);

    instance.navigateRoot.and.returnValue(Promise.resolve());
    instance.initPane.and.returnValue(1);

    // tslint:disable:no-string-literal
    instance['root'] = ViewControllerMock.instance();
    instance['rootParams'] = {};
    // tslint:enable:no-string-literal

    instance.navigateForward.and.returnValue(Promise.resolve());
    instance.insert.and.returnValue(Promise.resolve());
    instance.insertPage.and.returnValue(Promise.resolve());
    instance.navigateBack.and.returnValue(Promise.resolve());
    instance.remove.and.returnValue(Promise.resolve());
    instance.removeView.and.returnValue(Promise.resolve());
    instance.setRoot.and.returnValue(Promise.resolve());
    instance.setPages.and.returnValue(Promise.resolve());
    instance.hasChildren.and.returnValue(true);
    instance.canSwipeBack.and.returnValue(true);
    instance.canGoBack.and.returnValue(true);
    instance.isTransitioning.and.returnValue(false);
    instance.getActive.and.returnValue(ViewControllerMock.instance());
    instance.isActive.and.returnValue(true);
    instance.getByIndex.and.returnValue(ViewControllerMock.instance());
    instance.getPrevious.and.returnValue(ViewControllerMock.instance());
    instance.first.and.returnValue(ViewControllerMock.instance());
    instance.last.and.returnValue(ViewControllerMock.instance());
    instance.indexOf.and.returnValue(0);
    instance.length.and.returnValue(0);
    instance.getViews.and.returnValue([]);
    instance.isSwipeBackEnabled.and.returnValue(true);
    instance.viewDidEnter = of();
    instance.viewDidLeave = of();
    instance.viewDidLoad = of();
    instance.viewWillEnter = of();
    instance.viewWillLeave = of();
    instance.viewWillUnload = of();

    return instance;
  }

} // tslint:disable-line:max-file-line-count
