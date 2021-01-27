import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { spyOnClass } from '../../../../test';
import { Nationalitaet, NationalitaetenService } from './nationalitaeten.service';


describe('NationalitaetenService', () => {

  describe('ValueService', () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: NationalitaetenService;

    beforeEach(() => {
      httpClientSpy = spyOnClass(HttpClient);
      service = new NationalitaetenService(httpClientSpy as any);
    });



    it('should return expected one of the Nation (HttpClient called once)', () => {
      const nationalitaeten: Array<Nationalitaet> = [
        {value: 'A', label: 'Österreich'},
        {value: 'D', label: 'Deutschland'},
        {value: 'P', label: 'Portugal'},
        {value: 'CH', label: 'Schweiz'}];

      httpClientSpy.get.and.returnValue(of(nationalitaeten));

      service.ladeNationalitaeten().subscribe(
        (value: Nationalitaet[]) => {
          const ersteNation: Nationalitaet[] = value.slice(0, 0);
          expect(ersteNation).toEqual(nationalitaeten.slice(0, 0), 'expected nationalitaeten');
          expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        });
    });
  });
});
