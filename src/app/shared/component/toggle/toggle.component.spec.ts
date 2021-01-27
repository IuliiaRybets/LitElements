import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form [formGroup]="formGroup">
      <app-toggle id="toggle"
                  name="name"
                  valueLeft="Value1"
                  valueRight="Value2"
                  labelLeft="Label1"
                  labelRight="Label2"
                  formControlName="toggle"></app-toggle>
    </form>
  `
})
class TestToggleComponent {
  formGroup = new FormGroup({
    toggle: new FormControl('')
  });
}

describe('ToggleComponent', () => {
  let component: TestToggleComponent;
  let fixture: ComponentFixture<TestToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleComponent, TestToggleComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should save value in form control on change', () => {
    expect(component.formGroup.controls.toggle.value).toEqual('');
    fixture.debugElement.query(By.css('.toggleLeft')).nativeElement.click();
    expect(component.formGroup.controls.toggle.value).toEqual('Value1');
    fixture.debugElement.query(By.css('.toggleRight')).nativeElement.click();
    expect(component.formGroup.controls.toggle.value).toEqual('Value2');
  });

  it('should set checked if value is activevalue', () => {
    expect(fixture.debugElement.query(By.css('#toggleLeft')).nativeElement.checked).toEqual(false);

    fixture.debugElement.query(By.css('.toggleLeft')).nativeElement.click();

    expect(fixture.debugElement.query(By.css('#toggleLeft')).nativeElement.checked).toEqual(true);
  });

});
