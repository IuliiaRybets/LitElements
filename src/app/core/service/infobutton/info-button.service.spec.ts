import { InfoButtonService } from './info-button.service';
import { async, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { InfoButtonTextService } from '@core/service/infobutton/info-button-text.service';
import { InfoTextOverlayComponent } from '@shared/component/info-text-overlay/info-text-overlay.component';

describe('InfoButtonService', () => {

  let cut: InfoButtonService;
  let infoTextService: InfoButtonTextService;


  beforeEach(async(() => {
    infoTextService = new InfoButtonTextService();

    TestBed.configureTestingModule({
      declarations: [InfoTextOverlayComponent],
      imports: [OverlayModule],
      providers: [
        InfoButtonService,
        {provide: InfoButtonTextService, useValue: infoTextService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    cut = TestBed.inject(InfoButtonService);
  });

  it('should show and hide the infotext', async(() => {
    expect(isOverlayAttached()).toBeFalsy();
    cut.show();
    expect(isOverlayAttached()).toBeTruthy();
    cut.hide();
    expect(isOverlayAttached()).toBeFalsy();
  }));

  function isOverlayAttached(): boolean {
    return !!(document.getElementsByClassName('cdk-overlay-container') as HTMLCollectionOf<Element>)[0]
      .getElementsByClassName('infotext-container').length;
  }

});
