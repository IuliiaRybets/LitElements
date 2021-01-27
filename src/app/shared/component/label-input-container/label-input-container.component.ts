import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-label-input-container',
  templateUrl: './label-input-container.component.html',
  styleUrls: ['./label-input-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabelInputContainerComponent {

  @Input() labelText!: string;
  @Input() infoText?: string;
  @Input() errorText?: string;
  @Input() showError = false;

}
