import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HausratRoutes } from '@core/service/navigation/navigation.service';


const routes: Routes = [
  {path: HausratRoutes.relative.tarifergebnis, loadChildren: () => import('./tarifierung/tarifergebnis/tarifergebnis.module').then(m => m.TarifergebnisModule)},

  {path: HausratRoutes.relative.tarifierung, loadChildren: () => import('./tarifierung/tarifierung.module').then(m => m.TarifierungModule)},
  {path: HausratRoutes.relative.antrag, loadChildren: () => import('./antrag/antrag.module').then(m => m.AntragModule)},
  {path: HausratRoutes.relative.fehler, loadChildren: () => import('./fehler/fehler.module').then(m => m.FehlerModule)},
  {path: '**', redirectTo: HausratRoutes.absolute.tarifierung}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
