import {Component, ElementRef, Inject, OnInit, ViewChild, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Model} from '@core/data-model';
import {HausratRoutes} from '@core/service/navigation/navigation.service';
import {distinctUntilChangedEquality} from '@shared/rxjs.extensions';
import {sharedText} from '@shared/shared.text';
import {TarifeService} from '@tarifierung/tarife.service';
import {DEFAULT_SWIPER_CONFIG} from '@tarifierung/tarifergebnis/tarifergebnis.swiper.config';
import {tarifergebnisText} from '@tarifierung/tarifergebnis/tarifergebnis.text';
import {
  Tarif,
  Tarifierung,
  TARIFIERUNG,
  Tarifierungsparameter,
  Tarifname,
  ZahlweiseEnum
} from '@tarifierung/tarifierung.model';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, filter, map, switchMap} from 'rxjs/operators';
import {TarifergebnisValidator} from '@tarifierung/tarifergebnis/tarifergebnis.validator';
import {DokumentenNamen} from '../../tracking/directives/on-download-tracking.directive';
import {WindowRef} from '@core/browser-globals';
//import {UTM_PARAMS, UtmParams} from '../../utm.model';

@Component({
  selector: 'app-tarifergebnis',
  templateUrl: './tarifergebnis.component.html',
  styleUrls: ['./tarifergebnis.component.scss']
})
export class TarifergebnisComponent implements OnInit {


  @Input() berLand: string;
  @Input() totalSum: string;

  

  swipeConfig = DEFAULT_SWIPER_CONFIG;
  routes = HausratRoutes;
  sharedText = sharedText;
  text = tarifergebnisText;
  zahlweisen = ZahlweiseEnum;
  DokumentenNamen = DokumentenNamen;

  @ViewChild('fahrradwertEle') fahrradwertElement: ElementRef;
  @ViewChild('zusatzleistungenEle') zusatzleistungenEle: ElementRef;

  tarife$: Observable<Tarif[]>;
  selectedTarif$: Observable<Tarif | undefined>;
  onInitTrigger$ = new Subject();

  public tarifergebnisForm: FormGroup;
  public topseller: string | null;

  agbFrom: FormGroup;
  agbCeck = true;
  hideSelection = false;
  
  hideOverview = true;
  hideFinal = true;

  constructor(private readonly fb: FormBuilder,
              @Inject(TARIFIERUNG) private readonly model: Model<Tarifierung>,
              private readonly tarifeService: TarifeService,
              private readonly router: Router,
              private readonly windowRef: WindowRef) {
  }

  ngOnInit() {
    this.initFormGroup();
    
    const fahrraddiebstahlChange$ = this.fahrraddiebstahlGroup.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChangedEquality(),
      filter((value => !value.fahrraddiebstahlSchutz || (value.fahrraddiebstahlSchutz && this.fahrraddiebstahlGroup.valid)))
    );

    this.tarife$ = this.model.data$.pipe(map(tarifierung => tarifierung.tarife));
    this.selectedTarif$ = this.model.data$.pipe(map(value => value.selectedTarif));

    this.onInitTrigger$.next();
  }

  onTarifSelected(selectedTarif: Tarif) {
    this.model.patch({selectedTarif});

    this.windowRef.getNativeWindow().setTimeout(() => {
      this.zusatzleistungenEle.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 50);
  }

  get swiperIndex(): Observable<number> {
    return this.selectedTarif$.pipe(map(value => {
      if (value === undefined) {
        return 1;
      } else {
        switch (value.name) {
          case Tarifname.Classic:
            return 1;
          case Tarifname.Comfort:
            return 2;
          case Tarifname.Basic:
          default:
            return 0;
        }
      }
    }));
  }

  private initFormGroup() {
    const tarifierungsparameter = this.model.get().tarifierungsparameter;

    this.tarifergebnisForm = this.fb.group({
      selbstbeteiligung: [tarifierungsparameter.selbstbeteiligung, Validators.required],
      zahlweise: [tarifierungsparameter.zahlweise || ZahlweiseEnum.inland, Validators.required],
      ueberspannungsschutz: [tarifierungsparameter.ueberspannungsschaeden],
      fahrraddiebstahlGroup: this.fb.group({
        fahrraddiebstahlSchutz: [tarifierungsparameter.fahrraddiebstahl],
        fahrradwert: this.fb.control(tarifierungsparameter.fahrradwert,
          {updateOn: 'change'}),
      }, {
        validators: TarifergebnisValidator.fahrradwert
      }),
      glasbruchSchutz: [tarifierungsparameter.glasbruch],
      naturgefahrenSchutz: [tarifierungsparameter.elementarschaeden]
    });

    this.agbFrom = new FormGroup({
      agb: new FormControl(false, [Validators.required])
    });

    this.fahrraddiebstahlSchutz.valueChanges.subscribe(diebstahlSelected => {
      if (diebstahlSelected) {
        this.fahrradwertElement.nativeElement.focus();
      } else {
        this.fahrradwert.setValue(null);
      }
    });

  }

  belegeTarifauswahlVor(): void {
    const tarif = this.model.get().tarife;
  }

  backToSelection() {
    this.router.navigate([HausratRoutes.absolute.tarifierung]);
  }
  onAbschliessen() {
    this.tarifergebnisForm.markAllAsTouched();

    if (this.tarifergebnisForm.valid) {
      this.mapFormToModel();
      this.router.navigate([HausratRoutes.absolute.uebersicht]);
    }
  }

  mapFormToModel() {
    const tarifierungsparameterPartial: Partial<Tarifierungsparameter> = {
      zahlweise: this.zahlweise.value
    };
    const tarifierungsparameter = {...this.model.get().tarifierungsparameter, ...tarifierungsparameterPartial};
    this.model.patch({tarifierungsparameter});
  }

  asTarif(value: any) {
    return value as keyof typeof tarifergebnisText.tarife;
  }

  asZahlweise(value: any) {
    return value as keyof typeof sharedText.bereich;
  }

  get selbstbeteiligung(): AbstractControl {
    return this.tarifergebnisForm.controls.selbstbeteiligung;
  }

  get zahlweise(): AbstractControl {
    return this.tarifergebnisForm.controls.zahlweise;
  }

  get ueberspannungsschutz(): AbstractControl {
    return this.tarifergebnisForm.controls.ueberspannungsschutz;
  }

  get fahrraddiebstahlSchutz(): AbstractControl {
    return this.fahrraddiebstahlGroup.controls.fahrraddiebstahlSchutz;
  }

  get fahrradwert(): AbstractControl {
    return this.fahrraddiebstahlGroup.controls.fahrradwert;
  }

  get glasbruchSchutz(): AbstractControl {
    return this.tarifergebnisForm.controls.glasbruchSchutz;
  }

  get naturgefahrenSchutz(): AbstractControl {
    return this.tarifergebnisForm.controls.naturgefahrenSchutz;
  }

  get fahrraddiebstahlGroup(): FormGroup {
    return this.tarifergebnisForm.controls.fahrraddiebstahlGroup as FormGroup;
  }
}
