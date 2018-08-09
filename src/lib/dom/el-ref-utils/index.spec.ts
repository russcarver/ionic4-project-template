import { ElementRef } from '@angular/core';
import { addClass, clearStyle, hasClass, removeClass, setStyle } from 'lib/dom/el-ref-utils';

let elRef: ElementRef;

describe('elRefUtils', () => {
  beforeEach(() => {
    elRef = {
      nativeElement: document.createElement('div')
    };
  });

  describe('addClass', () => {
    it('should add a class name', () => {
      addClass(elRef, 'test');
      const actual: any = elRef.nativeElement.classList.contains('test');
      expect(actual).toBeTruthy();
    });
  });

  describe('removeClass', () => {
    it('should remove a class name', () => {
      addClass(elRef, 'test');
      removeClass(elRef, 'test');
      const actual: any = elRef.nativeElement.classList.contains('test');
      expect(actual).toBeFalsy();
    });
  });

  describe('hasClass', () => {
    it('should NOT have class name', () => {
      expect(hasClass(elRef, 'test')).toBeFalsy();
    });

    it('should have class name', () => {
      addClass(elRef, 'test');
      expect(hasClass(elRef, 'test')).toBeTruthy();
    });
  });

  describe('setStyle', () => {
    it('should update a style attribute', () => {
      setStyle(elRef, 'opacity', '0.5');
      const actual: any = elRef.nativeElement.style.opacity;
      expect(actual).toBe('0.5');
    });
  });

  describe('clearStyle', () => {
    it('should remove a style attribute', () => {
      setStyle(elRef, 'opacity', '0.5');
      clearStyle(elRef, 'opacity');
      const actual: any = elRef.nativeElement.style.opacity;
      expect(actual).toBe('');
    });
  });

  describe('Ionic Component', () => {
    it('should support ionic shared.components', () => {
      const el: Element = document.createElement('div');
      const ionComp: any = {
        getNativeElement: (): Element => el
      };
      addClass(ionComp, 'test');
      const actual: any = el.classList.contains('test');
      expect(actual).toBeTruthy();
    });
  });

  describe('Regular DOM Elements', () => {
    it('should support regular elements', () => {
      const el: Element = document.createElement('div');
      addClass(el, 'test');
      const actual: any = el.classList.contains('test');
      expect(actual).toBeTruthy();
    });
  });
});
