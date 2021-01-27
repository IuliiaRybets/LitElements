import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadNextStepGuard } from '@core/guards/can-load-next-step.guard';
import { HausratRoutes } from '@core/service/navigation/navigation.service';

const routes: Routes = [
  {path: '', redirectTo: HausratRoutes.relative.kundendaten},
 /* {
    path: HausratRoutes.relative.kundendaten,
    loadChildren: () => import('./kundendaten/kundendaten.module').then(m => m.KundendatenModule),
    canActivate: [CanLoadNextStepGuard]
  },
  {
    path: HausratRoutes.relative.vertragsdaten,
    loadChildren: () => import('./vertragsdaten/vertragsdaten.module').then(m => m.VertragsdatenModule),
    canActivate: [CanLoadNextStepGuard]
  },
  {
    path: HausratRoutes.relative.zahlungsdaten,
    loadChildren: () => import('./zahlungsdaten/zahlungsdaten.module').then(m => m.ZahlungsdatenModule),
    canActivate: [CanLoadNextStepGuard]
  },*/
  {
    path: HausratRoutes.relative.uebersicht,
    loadChildren: () => import('./uebersicht/uebersicht.module').then(m => m.UebersichtModule),
    canActivate: [CanLoadNextStepGuard]
  },
 /* {
    path: HausratRoutes.relative.zahlungbestaetigen,
    loadChildren: () => import('./zahlungbestaetigen/zahlungbestaetigen.module').then(m => m.ZahlungbestaetigenModule),
    canActivate: [CanLoadNextStepGuard]
  },
  {
    path: HausratRoutes.relative.bestaetigung,
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
