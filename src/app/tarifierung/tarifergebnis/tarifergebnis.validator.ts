import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TarifergebnisValidator {

  static fahrradwert = (group: AbstractControl): ValidationErrors | null => {
    const fahrraddiebstahl = group.get('fahrraddiebstahlSchutz');
    const fahrradwert = group.get('fahrradwert');
    if (fahrraddiebstahl && fahrraddiebstahl.value
      && fahrradwert && (fahrradwert.value < 100 || fahrradwert.value > 5000)) {
      return {fahrradwert: 'invalid'};
    }
    return null;
  }

}

