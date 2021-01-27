import { Component } from '@angular/core';
import { SpinnerTextService } from '@core/service/spinner/spinner-text.service';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})
export class SpinnerOverlayComponent {

  text: string;

  constructor(private readonly spinnerTextService: SpinnerTextService) {
    this.text = spinnerTextService.text;
  }

}
