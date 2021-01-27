import { FormControl } from '@angular/forms';
import { DateValidator } from '@shared/validators/date-validator';

describe('DateValidator', () => {


  describe('#minDate', () => {

    it('should return null if date is ok', () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const control = new FormControl(date);

      expect(DateValidator.minDate(new Date())(control)).toBe(null);
    });

    it('should return error if date is NOT ok', () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const control = new FormControl(date);

      expect(DateValidator.minDate(new Date())(control)).toEqual({minDate: true});
    });

  });

  describe('#maxDate', () => {

    it('should return null if date is ok', () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const control = new FormControl(date);

      expect(DateValidator.maxDate(new Date())(control)).toBe(null);
    });

    it('should return error if date is NOT ok', () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const control = new FormControl(date);

      expect(DateValidator.maxDate(new Date())(control)).toEqual({maxDate: true});
    });

  });
});
