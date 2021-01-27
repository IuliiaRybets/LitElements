import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarifergebnisComponent } from './tarifergebnis.component';


const routes: Routes = [{path: '', component: TarifergebnisComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifergebnisRoutingModule {
}
