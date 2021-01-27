import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

@Component({
  template: `
    <form [formGroup]="formGroup">
      <app-checkbox id="first" label="Label1" name="group" formControlName="first"></app-checkbox>
      <app-checkbox id="second" label="Label2" name="group" formControlName="second"></app-checkbox>
    </form>
  `
})
class TestCheckboxComponent {
  formGroup = new FormGroup({
    first: new FormControl(true),
    second: new FormControl(false)
  });
}

describe('CheckboxComponent', () => {
  let component: TestCheckboxComponent;
  let fixture: ComponentFixture<TestCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, TestCheckboxComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should save value in form control on click', () => {
    expect(component.formGroup.controls.first.value).toEqual(true);
    expect(component.formGroup.controls.second.value).toEqual(false);

    fixture.debugElement.query(By.css('#first input')).nativeElement.click();
    fixture.debugElement.query(By.css('#second input')).nativeElement.click();

    expect(component.formGroup.controls.first.value).toEqual(false);
    expect(component.formGroup.controls.second.value).toEqual(true);
  });
});
