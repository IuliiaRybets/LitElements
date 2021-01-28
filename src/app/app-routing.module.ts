import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomRouting } from '@core/service/navigation/navigation.service';


const routes: Routes = [
  {path: CustomRouting.relative.tarifergebnis, loadChildren: () => import('./tarifierung/tarifergebnis/tarifergebnis.module').then(m => m.TarifergebnisModule)},

  {path: CustomRouting.relative.tarifierung, loadChildren: () => import('./tarifierung/tarifierung.module').then(m => m.TarifierungModule)},
  {path: CustomRouting.relative.antrag, loadChildren: () => import('./antrag/antrag.module').then(m => m.AntragModule)},
  {path: CustomRouting.relative.fehler, loadChildren: () => import('./fehler/fehler.module').then(m => m.FehlerModule)},
  {path: '**', redirectTo: CustomRouting.absolute.tarifierung}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
