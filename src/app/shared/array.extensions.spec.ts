describe('Array swap', () => {

    it('should swap to elements', () => {
      expect([1, 2].swap(0, 1)).toEqual([2, 1]);
    });

    it('should do not swap if lower index out of bounds', () => {
      expect([1, 2].swap(-1, 1)).toEqual([1, 2]);
    });

    it('should do not swap if upper index out of bounds', () => {
      expect([1, 2].swap(0, 2)).toEqual([1, 2]);
    });

    it('should do not swap if only one element', () => {
      expect([1].swap(0, 1)).toEqual([1]);
    });

    it('should do not swap if no element', () => {
      expect([].swap(0, 1)).toEqual([]);
    });
  }
);
