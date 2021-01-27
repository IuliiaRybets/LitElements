import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FehlerRoutingModule} from './fehler-routing.module';
import {FehlerComponent} from './fehler.component';

@NgModule({
  declarations: [FehlerComponent],
  imports: [
    CommonModule,
    FehlerRoutingModule
  ]
})
export class FehlerModule { }
