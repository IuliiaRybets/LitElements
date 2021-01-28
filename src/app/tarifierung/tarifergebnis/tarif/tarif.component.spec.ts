import { LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tarif, Tarifname, Region } from '@tarifierung/tarifierung.model';
import { TarifComponent } from './tarif.component';

describe('TarifComponent', () => {
  let component: TarifComponent;
  let fixture: ComponentFixture<TarifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TarifComponent],
      providers: [{provide: LOCALE_ID, useValue: 'de'}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifComponent);
    component = fixture.componentInstance;
    component.tarif = {
      name: Tarifname.Basic
    } as Tarif;
    fixture.detectChanges();
  });

  it('should fire tarifSelected-Event on click', (done) => {
    component.tarifSelected.subscribe((t: Tarif) => {
      expect(t).toEqual(component.tarif);
      done();
    });

    fixture.debugElement.query(By.css('.tarif')).nativeElement.click();
  });

  it('should show right price when zahlungsweise changed', () => {
    component.tarif.beitraege = {
      jaehrlich: {
        brutto: 2,
        steuer: 1
      },
      halbjaehrlich: {
        brutto: 4,
        steuer: 3
      },
      vierteljaehrlich: {
        brutto: 6,
        steuer: 5
      }
    };
    component.zahlweise = Region.jaehrlich;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.preis')).nativeElement.innerHTML.trim())
      .toEqual('2,00&nbsp;EUR');

    component.zahlweise = Region.vierteljaehrlich;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.preis')).nativeElement.innerHTML.trim())
      .toEqual('6,00&nbsp;EUR');

  });

});
