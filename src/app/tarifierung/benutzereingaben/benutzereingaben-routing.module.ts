import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BenutzereingabenComponent } from './benutzereingaben.component';
import { TarifComponent } from '@tarifierung/tarifergebnis/tarif/tarif.component';

const routes: Routes = [
  {path: '', component: BenutzereingabenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenutzereingabenRoutingModule {
}
