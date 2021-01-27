import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UebersichtComponent } from './uebersicht.component';

const routes: Routes = [{path: '', component: UebersichtComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UebersichtRoutingModule {
}
