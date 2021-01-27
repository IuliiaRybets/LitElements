import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidator {
  static minDate = (minDate: Date): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && control.value && (Date.parse(control.value)) < minDate.getTime()) {
        return {minDate: true};
      }

      return null;
    };
  }

  static maxDate = (maxDate: Date): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && control.value && (Date.parse(control.value)) > maxDate.getTime()) {
        return {maxDate: true};
      }

      return null;
    };
  }
}
