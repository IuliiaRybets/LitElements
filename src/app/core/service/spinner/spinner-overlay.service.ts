import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from '@shared/spinner-overlay/spinner-overlay.component';
import { SpinnerTextService } from '@core/service/spinner/spinner-text.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private readonly spinnerTopRef: OverlayRef;

  constructor(private readonly overlay: Overlay,
              private readonly spinnerTextService: SpinnerTextService) {
    this.spinnerTopRef = this.cdkSpinnerCreate();
  }

  public show() {
    if (this.spinnerTopRef.hasAttached()) {
      return;
    }
    this.spinnerTopRef.attach(new ComponentPortal(SpinnerOverlayComponent));
  }

  public hide() {
    if (!this.spinnerTopRef.hasAttached()) {
      return;
    }
    this.spinnerTopRef.detach();
    this.spinnerTextService.resetText();
  }

  public setText(text: string) {
    this.spinnerTextService.text = text;
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }
}
