import { inject, InjectionToken } from '@angular/core';
import { async, inject as injectIntoTest, TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { map } from 'rxjs/operators';
import { Model, ModelFactory } from './data-model';


const TEST_MODEL = new InjectionToken<Model<TestModel>>('Test Model', {
  providedIn: 'root',
  factory: () => (inject(ModelFactory) as ModelFactory<TestModel>).create('testModel')
});

interface TestModel {
  name: string;
}

describe('Data Model', () => {

  beforeEach(async(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
  }));

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should set and get values from an injected model', injectIntoTest([TEST_MODEL], (model: Model<TestModel>) => {
      expect(model).toBeDefined();

      model.set({name: 'max mustermann'});
      expect(model.get()).toEqual({name: 'max mustermann'});
    })
  );

  it('should store the value in the session', injectIntoTest([TEST_MODEL], (model: Model<TestModel>) => {
      model.set({name: 'elke musterfrau'});

      expect(JSON.parse(sessionStorage.getItem('app-state') || '{}')).toEqual({testModel: {name: 'elke musterfrau'}});
    })
  );

  it('should emit values when model was changed', injectIntoTest([TEST_MODEL], (model: Model<TestModel>) => {
      const a: TestModel = {name: 'a'};
      const b: TestModel = {name: 'b'};
      const c: TestModel = {name: 'c'};

      cold('a--b--c--c--b', {a, b, c})
        .pipe(
          map((x: TestModel) => model.set(x)))
        .subscribe();

      const expected = cold('a--b--c--c--b', {a, b, c});
      expect(model.data$).toBeObservable(expected);
    })
  );

});
