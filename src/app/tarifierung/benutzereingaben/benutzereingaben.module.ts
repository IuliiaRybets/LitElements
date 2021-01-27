import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { BenutzereingabenRoutingModule } from './benutzereingaben-routing.module';
import { BenutzereingabenComponent } from './benutzereingaben.component';
import { SpinnerOverlayModule } from '@shared/spinner-overlay/spinner-overlay.module';


@NgModule({
  declarations: [BenutzereingabenComponent],
  imports: [
    BenutzereingabenRoutingModule,
    CommonModule,
    SharedModule,
    SpinnerOverlayModule,
  ]
})
export class BenutzereingabenModule {
}
