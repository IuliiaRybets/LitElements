import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DeepPartial } from '../global-types';

export class Model<T> {
  private readonly data: BehaviorSubject<T>;
  public data$: Observable<T>;

  constructor(initialData: DeepPartial<T>) {
    this.data = new BehaviorSubject(initialData as T);
    this.data$ = this.data
      .asObservable()
      .pipe(
        map((data: T) => JSON.parse(JSON.stringify(data))),
        shareReplay(1)
      );
  }

  get(): T {
    return this.data.getValue();
  }

  set(data: T) {
    this.data.next(data);
  }

  patch(data: Partial<T>): T {
    this.data.next({...this.data.value, ...data});
    return this.data.getValue();
  }
}

class SessionMiddleware<T> {

  private static readonly STATE_KEY = 'app-state';

  private readonly model: Model<T>;

  dateReviver = (key: string, value: any) => {
    if (typeof value === 'string' && value.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)) {
      return new Date(value);
    }
    return value;
  }

  constructor(slice: string, creator: (sessionState: T) => Model<T>) {
    this.model = creator(this.getSliceState(slice));
    this.model.data$.subscribe(value => {
      const updatedState = this.getState();
      updatedState[slice] = value;
      sessionStorage.setItem(SessionMiddleware.STATE_KEY, JSON.stringify(updatedState));
    });
  }

  private getSliceState(slice: string): T {
    return JSON.parse(sessionStorage.getItem(SessionMiddleware.STATE_KEY) || '{}', this.dateReviver)[slice];
  }

  private getState() {
    return JSON.parse(sessionStorage.getItem(SessionMiddleware.STATE_KEY) || '{}', this.dateReviver);
  }

  public getModel() {
    return this.model;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModelFactory<T> {
  create(slice: string, initialData?: DeepPartial<T>): Model<T> {
    return new SessionMiddleware<T>(
      slice,
      (sessionState => new Model<T>({...initialData, ...sessionState})))
      .getModel();
  }
}

