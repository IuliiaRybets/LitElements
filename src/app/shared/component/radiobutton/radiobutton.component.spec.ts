import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonComponent } from './radiobutton.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form [formGroup]="formGroup">
      <app-radiobutton id="first" name="name" value="First" label="Label" formControlName="first"></app-radiobutton>
      <app-radiobutton id="second" name="name" value="Second" label="Label2" formControlName="second"></app-radiobutton>
    </form>
  `
})
class TestRadiobuttonComponent {
  formGroup = new FormGroup({
    first: new FormControl(''),
    second: new FormControl('')
  });
}

describe('RadiobuttonComponent', () => {

  describe('IntTest', () => {
    let component: TestRadiobuttonComponent;
    let fixture: ComponentFixture<TestRadiobuttonComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [RadiobuttonComponent, TestRadiobuttonComponent],
        imports: [ReactiveFormsModule]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestRadiobuttonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should save value in form control on click', () => {
      expect(component.formGroup.controls.first.value).toEqual('');

      fixture.debugElement.query(By.css('#first input')).nativeElement.click();

      expect(component.formGroup.controls.first.value).toEqual('First');
    });

    it('should set checked if value is activevalue', () => {
      expect(fixture.debugElement.query(By.css('#first input')).nativeElement.checked).toEqual(false);

      fixture.debugElement.query(By.css('#first input')).nativeElement.click();

      expect(fixture.debugElement.query(By.css('#first input')).nativeElement.checked).toEqual(true);
    });

    it('should uncheck if another radiobutton is clicked', () => {
      expect(fixture.debugElement.query(By.css('#first input')).nativeElement.checked).toEqual(false);
      expect(fixture.debugElement.query(By.css('#second input')).nativeElement.checked).toEqual(false);

      fixture.debugElement.query(By.css('#first input')).nativeElement.click();

      expect(fixture.debugElement.query(By.css('#first input')).nativeElement.checked).toEqual(true);
      expect(fixture.debugElement.query(By.css('#second input')).nativeElement.checked).toEqual(false);

      fixture.debugElement.query(By.css('#second input')).nativeElement.click();

      expect(fixture.debugElement.query(By.css('#first input')).nativeElement.checked).toEqual(false);
      expect(fixture.debugElement.query(By.css('#second input')).nativeElement.checked).toEqual(true);
    });
  });


});
