import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { InfoButtonComponent } from './component/info-button/info-button.component';
import { InfoTextOverlayComponent } from './component/info-text-overlay/info-text-overlay.component';
import { LabelInputContainerComponent } from './component/label-input-container/label-input-container.component';
import { SpinnerOverlayModule } from './spinner-overlay/spinner-overlay.module';
import { RadiobuttonComponent } from './component/radiobutton/radiobutton.component';
import { ProgressBarComponent } from './component/progress-bar/progress-bar.component';
import { OnlynumberDirective } from '@shared/directive/only-numbers.directive';
import { RouterModule } from '@angular/router';
import { ToggleComponent } from './component/toggle/toggle.component';
import { HinweisComponent } from './component/hinweis/hinweis.component';
import { DatumComponent } from '@shared/component/datum/datum.component';
import { TarifPreisAnzeigeComponent } from './component/tarif-preis-anzeige/tarif-preis-anzeige.component';

@NgModule({
  declarations: [
    LabelInputContainerComponent,
    InfoButtonComponent,
    InfoTextOverlayComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    ProgressBarComponent,
    OnlynumberDirective,
    ToggleComponent,
    HinweisComponent,
    DatumComponent,
    TarifPreisAnzeigeComponent
  ],
  imports: [
    CommonModule,
    SpinnerOverlayModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    LabelInputContainerComponent,
    ReactiveFormsModule,
    RadiobuttonComponent,
    CheckboxComponent,
    InfoButtonComponent,
    ProgressBarComponent,
    InfoTextOverlayComponent,
    OnlynumberDirective,
    ToggleComponent,
    HinweisComponent,
    DatumComponent,
    TarifPreisAnzeigeComponent
  ],
})
export class SharedModule {
}
