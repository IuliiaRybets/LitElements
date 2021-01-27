import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { InfoTextOverlayComponent } from '@shared/component/info-text-overlay/info-text-overlay.component';
import { InfoButtonTextService } from '@core/service/infobutton/info-button-text.service';


@Injectable({
  providedIn: 'root'
})
export class InfoButtonService {
  private readonly infotextTopRef: OverlayRef;

  constructor(private readonly overlay: Overlay,
              private readonly infoButtonTextService: InfoButtonTextService) {
    this.infotextTopRef = this.cdkInfoTextCreate();
  }

  public show() {
    if (this.infotextTopRef.hasAttached()) {
      return;
    }
    this.infotextTopRef.attach(new ComponentPortal(InfoTextOverlayComponent));
  }

  public hide() {
    if (!this.infotextTopRef.hasAttached()) {
      return;
    }
    this.infotextTopRef.detach();
    this.infoButtonTextService.resetText();
  }

  public setText(text: string) {
    this.infoButtonTextService.text = text;
  }

  private cdkInfoTextCreate() {
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
