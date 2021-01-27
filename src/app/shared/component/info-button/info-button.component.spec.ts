import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InfoButtonService } from '@core/service/infobutton/info-button.service';

import { InfoButtonComponent } from './info-button.component';
import { instance, mock, verify } from 'ts-mockito';

@Component({
  template: `
    <app-info-button id='first' text="1"></app-info-button>
    <app-info-button id='second' text="2"></app-info-button>
    <div id="outside">test</div>
  `
})
class TestInfoButtonComponent {
}

describe('InfoButtonComponent', () => {
  let fixture: ComponentFixture<TestInfoButtonComponent>;
  let infoButtonService: InfoButtonService;

  beforeEach(async(() => {
    infoButtonService = mock(InfoButtonService);

    TestBed.configureTestingModule({
      declarations: [InfoButtonComponent, TestInfoButtonComponent],
      providers: [{provide: InfoButtonService, useFactory: () => instance(infoButtonService)}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInfoButtonComponent);
    fixture.detectChanges();
  });

  it('should call infoservice for show when clicked', () => {
    click('#first .info-button');
    verify(infoButtonService.show()).called();
  });

  it('should call infoservice for hide when clicked outside', () => {
    click('#outside');
    verify(infoButtonService.hide()).called();
  });


  function click(selector: string) {
    fixture.debugElement.query(By.css(selector)).nativeElement.click();
  }

});
