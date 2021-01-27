import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UebersichtRoutingModule } from './uebersicht-routing.module';
import { UebersichtComponent } from './uebersicht.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UebersichtRoutingModule,
    SharedModule
  ]
})
export class UebersichtModule {
}
