import { OnlynumberDirective } from './only-numbers.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

@Component({
  template: '<input appNumbersOnly/>'
})
class TestComponent {
  constructor() { }
}

let component: TestComponent;
let fixture: ComponentFixture<TestComponent>;

describe('OnlyNumbersDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        OnlynumberDirective,
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });
});

