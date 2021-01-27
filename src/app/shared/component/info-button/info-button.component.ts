import { Component, HostListener, Input } from '@angular/core';
import { InfoButtonService } from '@core/service/infobutton/info-button.service';

@Component({
  selector: 'app-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss']
})
export class InfoButtonComponent {

  @Input() public text: string;

  constructor(private readonly infoButtonService: InfoButtonService) {
  }

  toggleInfoText(event: Event) {
    this.infoButtonService.setText(this.text);
    this.infoButtonService.show();
    event.cancelBubble = true;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    this.infoButtonService.hide();
  }

}
