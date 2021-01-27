import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from './global.errorhandler';
import { WindowRef } from '@core/browser-globals';
import { LoggingService } from '@core/service/logging/logging.service';
import { mock } from 'ts-mockito';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;
  let win: any;
  let location: any;
  let log: LoggingService;

  beforeEach(() => {
    log = mock(LoggingService);
    location = {
      reload: () => {
      }
    };
    win = {location};

    TestBed.configureTestingModule({
      providers: [
        {provide: WindowRef, useValue: ({getNativeWindow: () => win})},
        {provide: LoggingService, useValue: log}
      ]
    });
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('should call reload on window when chunk loading error', () => {
    spyOn(location, 'reload');
    service.handleError({message: 'Loading chunk 3 failed'});

    expect(location.reload).toHaveBeenCalled();
  });

});
