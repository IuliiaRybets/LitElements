import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  TemplateRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  FormControl,
  ValidatorFn,
  FormArray, Form
} from '@angular/forms';
import {Router} from '@angular/router';
import {DocumentRef} from '@core/browser-globals';
import {Model} from '@core/data-model';
import {HausratRoutes} from '@core/service/navigation/navigation.service';
import {sharedText} from '@shared/shared.text';
import {Tarifierung, TARIFIERUNG, Tarifierungsparameter} from '@tarifierung/tarifierung.model';
import {Subject} from 'rxjs';
import {filter, startWith, switchMap, take, tap} from 'rxjs/operators';
import {benutzereingabenText} from './benutzereingaben.text';
import {tarifergebnisText} from '@tarifierung/tarifergebnis/tarifergebnis.text';
import {Pakete, BEREICH} from '../tarifierung.model';

@Component({
  selector: 'app-benutzereingaben',
  templateUrl: './benutzereingaben.component.html',
  styleUrls: ['./benutzereingaben.component.scss'],
})
export class BenutzereingabenComponent implements OnInit {
  agbFrom: FormGroup;
  agbCeck = true;
  hideSelection = false;
  hideOverview = true;
  hideFinal = true;
  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              @Inject(TARIFIERUNG) public readonly  model: Model<Tarifierung>,
              private readonly document: DocumentRef,
              private resolver: ComponentFactoryResolver
  ) { 
  }


  
  label = benutzereingabenText;
  text = tarifergebnisText;
  sharedText = sharedText;
  tarifierungsparameter: Tarifierungsparameter;

  onBerechnenTrigger$ = new Subject();
  bereich = BEREICH;
  showAusstieg = false;

  paketen: Array<any>;
  anzahlen: Array<any>;
  gebueren: Array<any>;
  gebuer = 0;

  tarifierungForm: FormGroup;
  pakets = Pakete;

  sum = 0;
  steuer = 0;
  totalSum = 0;
  myValChanges$: any;

  REGIONS: any = ['Inland', 'Ausland'];

  ngOnInit() {
    this.tarifierungForm = this.fb.group({
      berLand: [''],
      paket: [''],
      paketAnzahl: [''],
      // unitPrice: [{ value: '', disabled: true }],
      // unitTotalPrice: [{ value: '', disabled: true }],
      credentials: this.fb.array([
        this.getCreds()
      ])
    });
    this.agbFrom = new FormGroup({
      agb: new FormControl(false, [Validators.required])
    });
    // this.f.valueChanges.subscribe(() => this.showAusstieg = this.f.errors?.default);
    // this.credentials.valueChanges.subscribe(res => {
    //   this.showAusstieg = this.credentials.errors?.default;
    // });

    const vvv = this.tarifierungForm.get(['credentials', 'paket']);
    console.log(vvv);

    this.myValChanges$ = this.tarifierungForm.controls.credentials.valueChanges;
    this.myValChanges$.subscribe((value: any) => {
      this.calculateTotalPrice(value);
      this.showAusstieg = this.credentials.errors?.default;
    });

    this.onBerechnenTrigger$.pipe(
      tap(() => this.tarifierungForm.markAllAsTouched()),
      switchMap(() => this.credentials.statusChanges
        .pipe(
          startWith(this.credentials.status),
          filter(status => status !== 'PENDING'),
          take(1)
        )),
      filter(status => status === 'VALID')
    ).subscribe(() => this.confirmSelection());
  }

  get credentials() {
    return this.tarifierungForm.get('credentials') as FormArray;
  }

  getCreds() {
    return this.fb.group({
      berLand: ['', Validators.required],
      paket: ['', Validators.required],
      paketAnzahl: ['', Validators.required],
      unitPrice: ['0'],
    });
  }

  get berLand() {
    const control = this.tarifierungForm.controls.credentials as FormArray;
    console.log(control.value);
    // console.log(this.tarifierungForm.controls.credentials.get('berLand')?.value);
    return this.tarifierungForm.get('berLand');
    // return this.control.value;
  }

  getBerLandAtIndex(i: number) {
    const control = this.tarifierungForm.controls.credentials as FormArray;
    return control.at(i).get('berLand');
  }

  getPaketAtIndex(i: number) {
    const control = this.tarifierungForm.controls.credentials as FormArray;
    return control.at(i).get('paket');
  }

  getPaketAnzahlAtIndex(i: number) {
    const control = this.tarifierungForm.controls.credentials as FormArray;
    return control.at(i).get('paketAnzahl');
  }

  calculateTotalPrice(credentials: any) {
    this.sum = 0;
    this.steuer = 0;
    this.totalSum = 0;
    credentials.forEach((val: any, idx: any) => {
      this.sum += credentials[idx].unitPrice;
      this.steuer += (credentials[idx].unitPrice / 100) * 16;
      this.totalSum = this.sum + this.steuer;
    });
  }

  cmpare(index: any) {
    return index;
  }

  addCreds() {
    this.credentials.push(this.getCreds());
  }

  deleteCredentials(index: number) {
    this.credentials.removeAt(index);
  }

  changeBereich(e: any) {
    console.log(e);
    if (e=="Ausland") {
      console.log(true);
    }
    this.paketen = this.bereich.find(val => val.name === e.target.value).paketen;
    // const updatedBerLandValue = [{ berLand: e.target.value }];
    // this.tarifierungForm.patchValue({credentials: updatedBerLandValue});
  }

  changePaket(e: any, i: any) {
    console.log(e.target.value);
    this.anzahlen = this.paketen.find(val => val.name === e.target.value).anzahlen;
    console.log(this.anzahlen);
  }

  changeAnzahl(e: any, i: number) {
    const control = this.tarifierungForm.controls.credentials as FormArray;
    const paket = control.at(i).get('paket')?.value;
    const anzahl = e.target.value;
    let uPrice = 0;
    this.paketen.find(val => val.name === paket);
    this.pakets.forEach(element => {
      element.forEach(el => {
        if (el.name === paket) {
          uPrice = anzahl * el.price;
        }
      });
    });
    control.at(i).get('unitPrice')?.patchValue(uPrice);
/*    const newCredentials = [{
      paketAnzahl: anzahl,
      unitPrice: uPrice}];*/
    // this.tarifierungForm.patchValue({credentials: newCredentials});

    // const price = this.calcUnitPrice();
    // const priceCred = [{unitPrice: price}];
    // console.log(priceCred);
    // this.tarifierungForm.patchValue({credentials: priceCred});

    // this.paketen.find(val => val.name === pValue);
    // this.pakets.forEach(element => {
    //   console.log(element);
    //   element.forEach(el => {
    //     if (el.name === pValue) {
    //       console.log(el.name);
    //       const up = anzahl * el.price;
    //       console.log(up);
    //       console.log(anzahl * el.price);
    //         // this.gebuer = unitPrice.toString() + ' EUR';
    //     }
    //   });
    // });
  }

  calcPriceAtPosition(i: number) {
    let uPrice = 0;
    const control = this.tarifierungForm.controls.credentials as FormArray;
    const pakValue = control.at(i).get('paket')?.value;
    const anzahl = control.at(i).get('paketAnzahl')?.value;
    this.pakets.forEach(element => {
      element.forEach(el =>  {
        if (el.name === pakValue) {
          uPrice = anzahl * el.price;
        }
      });
    });
    const newCredentials = [{unitPrice: uPrice}];
    // const unPri = control.at(+i).get('unitPrice')?.value;
    control.at(+i).patchValue({credentials: newCredentials});
  }

/*  onBerechnenClick() {
    this.onBerechnenTrigger$.next();
    console.warn(this.tarifierungForm.status);
    console.warn(this.credentials.status);
  }*/

  onEnter() {
    this.showAusstieg = true;
    if (this.credentials.invalid) {
      return;
    }
    (this.document.getNativeDocument().activeElement as HTMLElement)?.blur();
    this.onBerechnenTrigger$.next();
  }

  getWohnflaecheErrorText() {
    return this.label.bereich.errors.default;
  }

  updateTotalPrice(credentials: any) {
    const control = this.tarifierungForm.controls.credentials as FormArray;
    this.totalSum = 0;
/*    for (const i in credentials) {
      const totalUnitPrice = credentials[i].unitPrice * 2;
      control.at(i).patchValue({unitTotalPrice: totalUnitPrice});
      // control.at(+i).('unitTotalPrice')?.setValue(totalUnitPrice, {onlySelf: true, emitEvent: false});
      this.totalSum += totalUnitPrice;
    }*/
  }

  confirmSelection(){
    this.hideSelection = true;
    this.hideOverview = false;
    this.hideFinal = true;
  }

  confirmBuy(){
    if (!this.agbFrom.get('agb')?.value) {
      this.agbCeck = false;
    }
    else {
      this.agbCeck = true;
      this.hideSelection = true;
      this.hideOverview = true;
      this.hideFinal = false;
    }
  }

  backToSelection() {
    this.hideSelection = false;
    this.hideOverview = true;
    this.hideFinal = true;
  }

  removeUnit(i: number) {
    const control = this.tarifierungForm.controls.units as FormArray;
    control.removeAt(i);
  }

  updateUnitTotalPrice(units: any) {
    const control = this.tarifierungForm.controls.units as FormArray;
    this.totalSum = 0;
    // tslint:disable-next-line:forin
    for (const i in units) {
      const totalUnitPrice = units[i].paket * units[i].paketAnzahl;
      // @ts-ignore
      control.at(+i).get('unitTotalPrice').setValue(totalUnitPrice, {onlySelf: true, emitEvent: false});
      this.totalSum += totalUnitPrice;
    }
  }

}

function isNameDup() {
  const validator: Validators = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value);

    const names = totalSelected.map(value => value.berLand);
    const hasDuplicate = names.some(
      (name, index) => names.indexOf(name, index + 1) !== -1
    );
    return hasDuplicate ? {duplicate: true} : null;
  };
  return validator;
}
