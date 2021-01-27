import { NgModule } from '@angular/core';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [SpinnerOverlayComponent],
  imports: [OverlayModule],
  exports: [SpinnerOverlayComponent]
})
export class SpinnerOverlayModule {
}
