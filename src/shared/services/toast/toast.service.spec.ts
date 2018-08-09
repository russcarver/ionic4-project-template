import { async, inject } from '@angular/core/testing';
import { ToastController, ToastOptions } from 'ionic-angular';

import { has } from 'lodash';

import noop from 'lib/noop';
import { ToastControllerMock, ToastMock } from 'mocks';
import { Message } from 'shared/services/request/models/message.model';
import { beforeEachProviderCompiler } from 'test-base';

import { ToastService } from './toast.service';

let displaySpy: jasmine.Spy;
let toastService: ToastService;

// tslint:disable:no-string-literal

const toastMock: ToastMock = ToastMock.instance();
(<jasmine.Spy> toastMock['onDidDismiss']).and.callThrough();
const toastControllerMock: ToastControllerMock = ToastControllerMock.instance(toastMock);

describe('ToastService', () => {

  // Wire up required service dependencies
  beforeEach(async(() => {
      beforeEachProviderCompiler([
        ToastService,
        { provide: ToastController, useValue: toastControllerMock }
      ]);
    }
  ));

  // Inject instances of the service
  beforeEach(inject(
    [
      ToastService
    ],
    (
     toastServiceParam: ToastService
    ) => {
      toastService = toastServiceParam;
    })
  );

  // Set up spies
  beforeEach(() => {
    spyOn(document, 'querySelector').and.returnValue({
      addEventListener: noop
    });
    displaySpy = spyOn(toastService, 'display').and.callThrough();
  });

  describe('Init', () => {

    it('should create service', () => {
      expect(toastService).toBeDefined();
    });

  });

  describe('Toast Service Methods', () => {

    it('should display custom toast forever when duration is zero', () => {

      const options: ToastOptions = {
        duration: 0,
        message: 'Testing 1,2,3'
      };

      toastService.display(options);

      expect(has(options, 'duration')).toBeFalsy();

    });

    it('should display error toast', () => {

      toastService.displayError('You are the weakest link. Bye-bye!');

      expect(displaySpy).toHaveBeenCalled();

    });

    it('should display info toast', () => {

      toastService.displayInfo('Your entress will be judged on taste, presentation and creativity!');

      expect(displaySpy).toHaveBeenCalled();

    });

    it('should display warning toast', () => {

      toastService.displayWarn('Final jeopardy!');

      expect(displaySpy).toHaveBeenCalled();

    });

    it('should display success toast', () => {

      toastService.displayInfo('You are the next contestant on the Price Is Right!');

      expect(displaySpy).toHaveBeenCalled();

    });

    it('should display toast with messages', () => {

      function messageGenerator(index: number, type: string): Message {
        const message: Message = new Message();
        message.field = `FLD${index}`;
        message.id = `MSG${index}`;
        message.message = `${type} message`;
        message.type = type;
        return message;
      }

      const message1: Message = messageGenerator(1, Message.messageTypeError);
      const message2: Message = messageGenerator(2, Message.messageTypeInfo);
      // const message3: Message = messageGenerator(3, Message.messageTypeWarn); // Unimplemented error type

      toastService.displayMessages([message1, message2]);

    });

    it('should throw error on unknown message', () => {

      let success: boolean;

      function messageGenerator(index: number): Message {
        const message: Message = new Message();
        message.field = `FLD${index}`;
        message.id = `MSG${index}`;
        message.message = 'Unknown message';
        return message;
      }

      const message1: Message = messageGenerator(1);

      try {
        toastService.displayMessages([message1]);
      } catch (e) {
        success = true;
      }

      if (!success) {
        fail();
      }

    });

  });

});
