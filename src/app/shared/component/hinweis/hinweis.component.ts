import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hinweis',
  templateUrl: './hinweis.component.html',
  styleUrls: ['./hinweis.component.scss']
})
export class HinweisComponent {

  @Input() headline?: string;

  constructor() {
  }

}
