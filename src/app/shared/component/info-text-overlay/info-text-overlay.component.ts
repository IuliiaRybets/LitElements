import { Component } from '@angular/core';
import { InfoButtonTextService } from '@core/service/infobutton/info-button-text.service';

@Component({
  selector: 'app-info-text-overlay',
  templateUrl: './info-text-overlay.component.html',
  styleUrls: ['./info-text-overlay.component.scss']
})
export class InfoTextOverlayComponent {

  text: string;

  constructor(private readonly infoButtonTextService: InfoButtonTextService) {
    this.text = infoButtonTextService.text;
  }

}
