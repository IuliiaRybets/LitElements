import { calculateAge, defaultOr, joined, mapBool, mapString, UNKNOWN_DEFAULT } from './util';

describe('util', () => {
  describe('#calculateAge', () => {

    afterEach(() => jasmine.clock().uninstall());

    it('should return undefined if input is undefined', () => {
      expect(calculateAge(undefined)).toBeUndefined();
    });

    it('should calulate the age based on a string', () => {
      jasmine.clock().mockDate(new Date(2019, 1));
      expect(calculateAge('2000-01-01')).toBe(19);
    });

    it('should calulate the age based on a date', () => {
      jasmine.clock().mockDate(new Date(2018, 1));
      expect(calculateAge(new Date(2001, 4))).toBe(16);
    });
  });

  describe('#defaultOr', () => {
    it('should return the default value on undefined', () => {
      expect(defaultOr(undefined)).toBe(UNKNOWN_DEFAULT);
    });

    it('should return the value as string even it is falsy', () => {
      expect(defaultOr(false)).toBe('false');
    });

    it('should return a number as string', () => {
      expect(defaultOr(10.2)).toBe('10.2');
    });
    it('should invoke the param if it is a function', () => {
      expect(defaultOr(() => 'value')).toBe('value');
    });

    it('should invoke the param if it is a function and return the default on undefined', () => {
      expect(defaultOr(() => undefined)).toBe(UNKNOWN_DEFAULT);
    });
  });

  describe('#joined', () => {
    it('should join the given strings with a | in between', () => {
      expect(joined(['bla', 'given', 'foo'])).toBe('bla | given | foo');
    });

    it('should ignore undefined values', () => {
      expect(joined(['bla', undefined, 'given', undefined, 'foo', undefined])).toBe('bla | given | foo');
    });

    it('should return undefined if no input given', () => {
      expect(joined([])).toBeUndefined();
    });

    it('should return undefined if no only undefined is given', () => {
      expect(joined([undefined, undefined])).toBeUndefined();
    });
  });

  describe('#mapString', () => {
    it('should map the given string based on the mapping given', () => {
      expect(mapString('m', {m: 'man', w: 'woman'})).toBe('man');
    });

    it('should return undefined if input is undefined', () => {
      expect(mapString(undefined, {})).toBeUndefined();
    });

    it('should return undefined if no mapping given', () => {
      expect(mapString('x', {m: 'man', w: 'woman'})).toBeUndefined();
    });
  });

  describe('#mapBool', () => {
    it('should return undefined if input is undefined', () => {
      expect(mapBool(undefined, 'wahr')).toBeUndefined();
    });

    it('should return the trueMapping on true', () => {
      expect(mapBool(true, 'wahr')).toBe('wahr');
    });

    it('should return undefined if no falseMapping and value false', () => {
      expect(mapBool(false, 'wahr')).toBeUndefined();
    });

    it('should return the falseMapping on  false', () => {
      expect(mapBool(false, 'wahr', 'falsch')).toBe('falsch');
    });
  });
});
