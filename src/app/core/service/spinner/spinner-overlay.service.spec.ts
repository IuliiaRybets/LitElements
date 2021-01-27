import { OverlayModule } from '@angular/cdk/overlay';
import { async, TestBed } from '@angular/core/testing';
import { SpinnerOverlayComponent } from '@shared/spinner-overlay/spinner-overlay.component';
import { SpinnerOverlayService } from './spinner-overlay.service';
import { SPINNER_DEFAULT_TEXT, SpinnerTextService } from '@core/service/spinner/spinner-text.service';

describe('SpinnerOverlayService', () => {
  let cut: SpinnerOverlayService;
  let spinnerTextService: SpinnerTextService;

  beforeEach(async(() => {
    spinnerTextService = new SpinnerTextService();

    TestBed.configureTestingModule({
      declarations: [SpinnerOverlayComponent],
      imports: [OverlayModule],
      providers: [
        SpinnerOverlayService,
        {provide: SpinnerTextService, useValue: spinnerTextService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    cut = TestBed.inject(SpinnerOverlayService);
  });

  it('should show and hide the spinner', async(() => {
    expect(isOverlayAttached()).toBeFalsy();
    cut.show();
    expect(isOverlayAttached()).toBeTruthy();
    cut.hide();
    expect(isOverlayAttached()).toBeFalsy();
  }));

  it('should reset spinner text after hide', () => {
    cut.setText('CustomText');
    cut.show();
    expect(spinnerTextService.text).toEqual('CustomText');
    cut.hide();
    expect(spinnerTextService.text).toEqual(SPINNER_DEFAULT_TEXT);
  });

});

function isOverlayAttached(): boolean {
  return !!(document.getElementsByClassName('cdk-overlay-container') as HTMLCollectionOf<Element>)[0]
    .getElementsByClassName('spinner-container').length;
}
