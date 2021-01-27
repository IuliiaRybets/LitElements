import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class WindowRef {
  getNativeWindow(): any {
    return window;
  }
}

@Injectable({providedIn: 'root'})
export class DocumentRef {
  getNativeDocument(): Document {
    return document;
  }
}
