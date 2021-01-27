import { distinctUntilChangedEquality } from '@shared/rxjs.extensions';
import { cold } from 'jasmine-marbles';

describe('Rxjs Extensions', () => {

  it('#distinctUntilChanged', () => {
    const values = cold('a--b--a--a--b', {a: {deep: 1}, b: {deep: 2}}).pipe(
      distinctUntilChangedEquality()
    );
    const expected = cold('a--b--a-----b', {a: {deep: 1}, b: {deep: 2}});

    expect(values).toBeObservable(expected);
  });

});
