// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { Type } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { MockDirective } from 'ng-mocks';
import { OnAnsprechpartnersucheTrackingDirective } from './app/tracking/directives/on-ansprechpartnersuche-tracking.directive';
import { OnAusschlussTrackingDirective } from './app/tracking/directives/on-ausschluss-tracking.directive';
import { OnBackTrackingDirective } from './app/tracking/directives/on-back-tracking.directive';
import { OnDownloadTrackingDirective } from './app/tracking/directives/on-download-tracking.directive';
import { OnErrorTrackingDirective } from './app/tracking/directives/on-error-tracking.directive';
import { OnPurchaseTrackingDirective } from './app/tracking/directives/on-purchase-tracking.directive';
import { OnTerminvereinbarungTrackingDirective } from './app/tracking/directives/on-terminvereinbarung-tracking.directive';

declare const require: any;

registerLocaleData(localeDe);

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

export type Spied<T> = {
  [M in keyof T]: jasmine.Spy
};

export function spyOnClass<T>(spiedClass: Type<T>): Spied<T> {
  const prototype = spiedClass.prototype;

  const methods = Object.getOwnPropertyNames(prototype)
    .map(name => [name, Object.getOwnPropertyDescriptor(prototype, name)])
    .filter(([name, descriptor]) => (descriptor as PropertyDescriptor).value instanceof Function)
    .map(([name]) => name);

  return jasmine.createSpyObj(prototype.constructor.name, [...methods]);
}

afterEach(() => sessionStorage.clear());

export const TrackingDirectiveMocks = [
  MockDirective(OnAnsprechpartnersucheTrackingDirective),
  MockDirective(OnAusschlussTrackingDirective),
  MockDirective(OnBackTrackingDirective),
  MockDirective(OnDownloadTrackingDirective),
  MockDirective(OnErrorTrackingDirective),
  MockDirective(OnPurchaseTrackingDirective),
  MockDirective(OnTerminvereinbarungTrackingDirective)
];
