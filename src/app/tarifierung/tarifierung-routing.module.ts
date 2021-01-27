import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadNextStepGuard } from '@core/guards/can-load-next-step.guard';
import { HausratRoutes } from '@core/service/navigation/navigation.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./benutzereingaben/benutzereingaben.module').then(m => m.BenutzereingabenModule),
  },
  {
    path: HausratRoutes.relative.tarifergebnis,
    loadChildren: () => import('./tarifergebnis/tarifergebnis.module').then(m => m.TarifergebnisModule),
   // canActivate: [CanLoadNextStepGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifierungRoutingModule {
}
