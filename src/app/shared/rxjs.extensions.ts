import { distinctUntilChanged } from 'rxjs/operators';

export function distinctUntilChangedEquality<T>() {
  return distinctUntilChanged((x: T, y: T) => JSON.stringify(x) === JSON.stringify(y));
}
