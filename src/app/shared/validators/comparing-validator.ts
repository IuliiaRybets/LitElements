import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class ComparingValidator {

  static allOrNonFilled = (abstractControl: AbstractControl): ValidationErrors | null => {
    const group = abstractControl as FormGroup;
    let error = false;

    const valueExist = Object.keys(group.controls)
      .filter(c => group.get(c)?.value !== '' && group.get(c)?.value !== null && group.get(c)?.value !== undefined)
      .length > 0;

    if (valueExist) {
      Object.keys(group.controls).forEach(c => {
        const control = group.get(c);
        if (!control?.value) {
          error = true;
        }
      });
    }
    if (error) {
      return {allOrNonFilled: 'error'};
    }
    return null;
  }
}
