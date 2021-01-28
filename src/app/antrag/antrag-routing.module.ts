import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadNextStepGuard } from '@core/guards/can-load-next-step.guard';
import { CustomRouting } from '@core/service/navigation/navigation.service';

const routes: Routes = [
  {path: '', redirectTo: CustomRouting.relative.kundendaten},
 /* {
    path: CustomRouting.relative.kundendaten,
    loadChildren: () => import('./kundendaten/kundendaten.module').then(m => m.KundendatenModule),
    canActivate: [CanLoadNextStepGuard]
  },
  {
    path: CustomRouting.relative.vertragsdaten,
    loadChildren: () => import('./vertragsdaten/vertragsdaten.module').then(m => m.VertragsdatenModule),
    canActivate: [CanLoadNextStepGuard]
  },
  {
    path: CustomRouting.relative.zahlungsdaten,
    loadChildren: () => import('./zahlungsdaten/zahlungsdaten.module').then(m => m.ZahlungsdatenModule),
    canActivate: [CanLoadNextStepGuard]
  },*/
  {
    path: CustomRouting.relative.uebersicht,
    loadChildren: () => import('./uebersicht/uebersicht.module').then(m => m.UebersichtModule),
    canActivate: [CanLoadNextStepGuard]
  },
 /* {
    path: CustomRouting.relative.zahlungbestaetigen,
    loadChildren: () => import('./zahlungbestaetigen/zahlungbestaetigen.module').then(m => m.ZahlungbestaetigenModule),
    canActivate: [CanLoadNextStepGuard]
  },
  {
    path: CustomRouting.relative.bestaetigung,
    loadChildren: () => import('./bestaetigung/bestaetigung.module').then(m => m.BestaetigungModule),
    canActivate: [CanLoadNextStepGuard]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntragRoutingModule {
}
