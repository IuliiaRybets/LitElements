import { Component, OnInit } from '@angular/core';
import { sharedText } from '@shared/shared.text';
import { TerminvereinbarenService } from '@core/service/terminvereinbaren/terminvereinbaren.service';
import { fehlerText } from './fehler.text';
import { LoggingService } from '@core/service/logging/logging.service';

@Component({
  selector: 'app-fehler',
  templateUrl: './fehler.component.html',
  styleUrls: ['./fehler.component.scss']
})
export class FehlerComponent implements OnInit {

  sharedText = sharedText;
  fehlerText = fehlerText;

  constructor(private readonly terminService: TerminvereinbarenService) {
  }

  ngOnInit() {
  }

  onTerminVereinbaren() {
    this.terminService.onTerminvereinbaren();
  }
}
