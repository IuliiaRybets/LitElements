import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedModule } from '../../shared/shared.module';
import { TarifComponent } from './tarif/tarif.component';

import { TarifergebnisRoutingModule } from './tarifergebnis-routing.module';
import { TarifergebnisComponent } from './tarifergebnis.component';

@NgModule({
  declarations: [TarifergebnisComponent, TarifComponent],
  imports: [
    TarifergebnisRoutingModule,
    SharedModule,
    SwiperModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TarifergebnisModule {
}
