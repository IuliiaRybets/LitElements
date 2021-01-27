import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { sharedText } from '@shared/shared.text';
import { ReplaySubject } from 'rxjs';

import { ProgressBarComponent } from './progress-bar.component';

@Component({template: ``})
class DummyComponent {
}

const progressBarText = sharedText.progressBar;

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let page: Page;
  let navigationTrigger: ReplaySubject<NavigationEnd>;

  beforeEach(async(() => {
    navigationTrigger = new ReplaySubject();
    TestBed.configureTestingModule({
      declarations: [ProgressBarComponent, DummyComponent],
      imports: [],
      providers: [{
        provide: Router, useClass: class Stub {
          events = navigationTrigger;
        }
      }]
    }).compileComponents();

  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    page = new Page(fixture, navigationTrigger);
  });

  it(`should mark "${progressBarText.step1}" as active on "${HausratRoutes.absolute.kundendaten}"`, () => {
    page.navigate(HausratRoutes.absolute.kundendaten);
    expect(page.active).toEqual(progressBarText.step1);
    expect(page.completed).toEqual([]);
    expect(page.open).toEqual([progressBarText.step2, progressBarText.step3, progressBarText.step4]);
  });

  it(`should mark "${progressBarText.step2}" as active on "${HausratRoutes.absolute.vertragsdaten}"`, () => {
    page.navigate(HausratRoutes.absolute.vertragsdaten);

    expect(page.active).toEqual(progressBarText.step2);
    expect(page.completed).toEqual([progressBarText.step1]);
    expect(page.open).toEqual([progressBarText.step3, progressBarText.step4]);
  });

  it(`should mark "${progressBarText.step3}" as active on "${HausratRoutes.absolute.zahlungsdaten}"`, () => {
    page.navigate(HausratRoutes.absolute.zahlungsdaten);

    expect(page.active).toEqual(progressBarText.step3);
    expect(page.completed).toEqual([progressBarText.step1, progressBarText.step2]);
    expect(page.open).toEqual([progressBarText.step4]);
  });

  it(`should mark "${progressBarText.step4} as active on "${HausratRoutes.absolute.uebersicht}"`, () => {
    page.navigate(HausratRoutes.absolute.uebersicht);

    expect(page.active).toEqual(progressBarText.step4);
    expect(page.completed).toEqual([progressBarText.step1, progressBarText.step2, progressBarText.step3]);
    expect(page.open).toEqual([]);
  });

  it('should not be visible on non configured pages', () => {
    page.navigate(HausratRoutes.absolute.fehler);

    expect(page.visible).toEqual(false);
  });
});

class Page {

  constructor(private readonly fixture: ComponentFixture<ProgressBarComponent>,
              private readonly navigationTrigger: ReplaySubject<NavigationEnd>) {
  }

  navigate(url: string) {
    this.navigationTrigger.next(new NavigationEnd(0, url, url));
    this.fixture.detectChanges();
  }

  get visible(): boolean {
    return this.fixture.debugElement.query(By.css('.progressbar')) !== null;
  }

  get active(): string {
    return this.fixture.debugElement.query(By.css('.active .stepLabel')).nativeElement.innerText.replace(/[\u00AD\u002D\u2011]+/g, '&shy;');
  }

  get open(): string[] {
    return this.fixture.debugElement.queryAll(By.css('.step:not(.active):not(.completed) .stepLabel')
    ).map((value: DebugElement) => value.nativeElement.innerText.replace(/[\u00AD\u002D\u2011]+/g, '&shy;'));
  }

  get completed(): string[] {
    return this.fixture.debugElement.queryAll(By.css('.completed .stepLabel')
    ).map((value: DebugElement) => value.nativeElement.innerText.replace(/[\u00AD\u002D\u2011]+/g, '&shy;'));
  }

}
