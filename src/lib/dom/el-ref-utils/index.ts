import { ElementRef } from '@angular/core';

import { isFunction } from 'lodash';

import { isDefined } from 'lib/util';

const getElement: Function = (ref: any): any => {
  if (isFunction(ref.getNativeElement)) {
    return ref.getNativeElement();
  }
  if (isDefined(ref.nativeElement)) {
    return ref.nativeElement;
  }
  return ref;
};

export const hasClass: Function = (elRef: ElementRef, className: string): boolean => elRef.nativeElement.classList.contains(className);

export const addClass: Function = (elRef: ElementRef, className: string): void => {
  getElement(elRef).classList.add(className);
};

export const removeClass: Function = (elRef: ElementRef, className: string): void => {
  getElement(elRef).classList.remove(className);
};

export const setStyle: Function = (elRef: ElementRef, key: string, value: string): void => {
  getElement(elRef).style[key] = value;
};

export const clearStyle: Function = (elRef: ElementRef, key: string): void => {
  getElement(elRef).style[key] = '';
};
