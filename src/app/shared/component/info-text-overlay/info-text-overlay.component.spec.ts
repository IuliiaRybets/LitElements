import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTextOverlayComponent } from './info-text-overlay.component';

describe('InfoTextOverlayComponent', () => {
  let component: InfoTextOverlayComponent;
  let fixture: ComponentFixture<InfoTextOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTextOverlayComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTextOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
