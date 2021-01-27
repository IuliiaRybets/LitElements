import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavigationService } from '@core/service/navigation/navigation.service';
import { AppComponent } from './app.component';
import { TrackingService } from './tracking/tracking.service';
import { instance, mock, verify } from 'ts-mockito';
import { EnvironmentService } from '@core/service/environment/environment.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { WindowRef } from '@core/browser-globals';
import { ReplaySubject } from 'rxjs';
import {MaskenwechselService} from '@core/service/maskenwechsel/maskenwechsel.service';

describe('AppComponent', () => {
  const trackingMock = mock(TrackingService);
  const maskenwechselserviceMock = mock(MaskenwechselService);
  const environmentMock = mock(EnvironmentService);
  const routerMock = {
      events: new ReplaySubject<RouterEvent>(1)
    }
  ;
  const win = {
    scrollTo: (x: number, y: number) => {
    },
    setTimeout: (fn: () => void, ms: number) => {
      fn();
    },
    location: {
      search: ''
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: NavigationService, useValue: {
            observeUrlChange() {
            }
          }
        },
        {provide: TrackingService, useFactory: () => instance(trackingMock)},
        {provide: MaskenwechselService, useFactory: () => instance(maskenwechselserviceMock)},
        {provide: EnvironmentService, useFactory: () => instance(environmentMock)},
        {provide: Router, useValue: routerMock},
        {provide: WindowRef, useValue: ({getNativeWindow: () => win})}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.createComponent(AppComponent);
  });

  it('should init tracking', () => {
    verify(trackingMock.initTracking()).called();
  });

  it('should call maskenwechselService with every router event', () => {

    const routerEvent = new NavigationEnd(1, '', '');
    routerMock.events.next(routerEvent);
    verify(maskenwechselserviceMock.reportMaskenwechsel(routerEvent)).called();

  });

  it('should scroll to top on router event navigationEnd', fakeAsync(() => {
    spyOn(win, 'scrollTo');

    routerMock.events.next(new NavigationEnd(1, '', ''));

    tick(100);
    expect(win.scrollTo).toHaveBeenCalled();

  }));
});
