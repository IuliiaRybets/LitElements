import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FehlerComponent } from './fehler.component';

const routes: Routes = [{ path: '', component: FehlerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FehlerRoutingModule { }
