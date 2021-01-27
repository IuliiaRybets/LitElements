import { Injectable } from '@angular/core';
import { sharedText } from '@shared/shared.text';

export const SPINNER_DEFAULT_TEXT = sharedText.spinner.default;

@Injectable({
  providedIn: 'root'
})
export class SpinnerTextService {
  public text = SPINNER_DEFAULT_TEXT;

  constructor() {
  }

  resetText() {
    this.text = SPINNER_DEFAULT_TEXT;
  }

}
