import { ErrorHandler, Injectable } from '@angular/core';
import { WindowRef } from '@core/browser-globals';
import { LoggingService } from '@core/service/logging/logging.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private readonly windowRef: WindowRef,
              private readonly log: LoggingService) {
  }

  handleError(error: any): void {
    if (environment.production) {
      this.log.error(`Unerwarteter Fehler: ${error.message.substring(0, 200)}`);
    } else {
      console.error(error);
    }

    this.handleChunkFailed(error);
  }

  handleChunkFailed(error: any) {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      this.windowRef.getNativeWindow().location.reload();
    }
  }

}
