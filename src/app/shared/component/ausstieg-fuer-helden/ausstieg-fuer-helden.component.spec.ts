import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusstiegFuerHeldenComponent } from './ausstieg-fuer-helden.component';
import { instance, mock, verify } from 'ts-mockito';
import { TerminvereinbarenService } from '@core/service/terminvereinbaren/terminvereinbaren.service';
import { AnsprechpartnerWeiterleitungService } from '@core/service/ap-weiterleitung/ansprechpartner-weiterleitung.service';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-ausstieg-fuer-helden [showDialog]="true"></app-ausstieg-fuer-helden>`
})
class TestAusstiegFuerHeldenComponent {
}

describe('AusstiegFuerHeldenComponent', () => {
  let component: TestAusstiegFuerHeldenComponent;
  let fixture: ComponentFixture<TestAusstiegFuerHeldenComponent>;

  let terminvereinbarenServiceMock: TerminvereinbarenService;
  let ansprechpartnerServiceMock: AnsprechpartnerWeiterleitungService;

  beforeEach(async(() => {
    terminvereinbarenServiceMock = mock(TerminvereinbarenService);
    ansprechpartnerServiceMock = mock(AnsprechpartnerWeiterleitungService);

    TestBed.configureTestingModule({
      declarations: [TestAusstiegFuerHeldenComponent, AusstiegFuerHeldenComponent],
      providers: [
        {provide: TerminvereinbarenService, useFactory: () => instance(terminvereinbarenServiceMock)},
        {provide: AnsprechpartnerWeiterleitungService, useFactory: () => instance(ansprechpartnerServiceMock)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAusstiegFuerHeldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Ansprechpartner Suchen Button', () => {
    it('should call ansprechpartner service on click', () => {
      fixture.debugElement.query(By.css('#ansprechpartner')).nativeElement.click();
      verify(ansprechpartnerServiceMock.onAnsprechpartnersuchen()).called();
    });
  });

  describe('Termin vereinbaren Button', () => {
    it('should call terminvereinbaren service on click', () => {
      fixture.debugElement.query(By.css('#terminvereinbaren')).nativeElement.click();
      verify(terminvereinbarenServiceMock.onTerminvereinbaren()).called();
    });
  });

});
