import { ComparingValidator } from '@shared/validators/comparing-validator';
import { FormControl, FormGroup } from '@angular/forms';


describe('ComparingValidator', () => {

  describe('#allOrNonFilled', () => {

    it('should return null if all controls all empty', () => {
      const group = new FormGroup({
        first: new FormControl(),
        second: new FormControl(),
        third: new FormControl()
      });
      expect(ComparingValidator.allOrNonFilled(group)).toBe(null);
    });

    it('should return null if all controls all filled', () => {
      const group = new FormGroup({
        first: new FormControl('a'),
        second: new FormControl('b'),
        third: new FormControl('c')
      });
      expect(ComparingValidator.allOrNonFilled(group)).toBe(null);
    });

    it('should return error if only one control is empty', () => {
      const group = new FormGroup({
        first: new FormControl('a'),
        second: new FormControl(),
        third: new FormControl('c')
      });
      expect(ComparingValidator.allOrNonFilled(group)).toEqual({allOrNonFilled: 'error'});
    });
  });

});
