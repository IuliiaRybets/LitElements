import {Component, Inject, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Model} from '@core/data-model';
import {CustomRouting} from '@core/service/navigation/navigation.service';
import {sharedText} from '@shared/shared.text';
import {TarifeService} from '@tarifierung/tarife.service';
import {tarifergebnisText} from '@tarifierung/tarifergebnis/tarifergebnis.text';
import {
  Tarif,
  TARIFIERUNG,
  Region,
} from '@tarifierung/tarifierung.model';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {WindowRef} from '@core/browser-globals';

@Component({
  selector: 'app-tarifergebnis',
  templateUrl: './tarifergebnis.component.html',
  styleUrls: ['./tarifergebnis.component.scss']
})
export class TarifergebnisComponent implements OnInit {

  tarife: Tarif[];

  @Input() berLand: string;
  @Input() totalSum: string;


  routes = CustomRouting;
  sharedText = sharedText;
  text = tarifergebnisText;
  zahlweisen = Region;

  tarife$: Observable<Tarif[]>;
  selectedTarif$: Observable<Tarif>;
  onInitTrigger$ = new Subject();

  public topseller: string | null;

  public agbFrom: FormGroup;
  agbCeck = true;

  constructor(private readonly fb: FormBuilder,
              @Inject(TARIFIERUNG) private readonly model: Model<Tarif>,
              private readonly tarifeService: TarifeService,
              private readonly router: Router,
              private readonly windowRef: WindowRef) {

  }

  ngOnInit() {
    
    this.initFormGroup();

    this.tarife = this.tarifeService.getItems();   

    this.selectedTarif$ = this.model.data$.pipe(map(value => value));
  
    console.log( this.tarife );
    this.onInitTrigger$.next();
  }


  private initFormGroup() {
    this.agbFrom = new FormGroup({
      agb: new FormControl(false, [Validators.required])
    });
  }

  backToSelection() {
    this.router.navigate([CustomRouting.absolute.tarifierung]);
  }

  onAbschliessen() {

    this.agbFrom.markAllAsTouched();

    if (this.agbFrom.valid) {
      //this.mapFormToModel();
      this.router.navigate([CustomRouting.absolute.uebersicht]);
    }
  }
}
