import { Injectable } from '@angular/core';

export const INFOTEXT_DEFAULT_TEXT = 'placeholder';

@Injectable({
  providedIn: 'root'
})
export class InfoButtonTextService {

  public text = INFOTEXT_DEFAULT_TEXT;

  resetText() {
    this.text = INFOTEXT_DEFAULT_TEXT;
  }
}
