import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Model } from '@core/data-model';
import { Tarife, TARIFIERUNG, Tarifierung, Tarifierungsparameter, Tarifname } from '@tarifierung/tarifierung.model';
import { TarifeService } from '@tarifierung/tarife.service';

describe('TarifeService', () => {
  let httpTestingController: HttpTestingController;
  let cut: TarifeService;

  let model: Model<Tarifierung>;

  const expectedTarife: Tarife = {
    tarife: [
      {
        name: Tarifname.Basic,
        beitraege: {
          jaehrlich: {brutto: 21.53, steuer: 2.99},
          vierteljaehrlich: {brutto: 5.92, steuer: 0.82},
          halbjaehrlich: {brutto: 11.31, steuer: 1.57}
        }
      }, {
        name: Tarifname.Classic,
        beitraege: {
          jaehrlich: {brutto: 36.99, steuer: 5.14},
          vierteljaehrlich: {brutto: 10.17, steuer: 1.41},
          halbjaehrlich: {brutto: 19.44, steuer: 2.7}
        }
      }, {
        name: Tarifname.Comfort,
        beitraege: {
          jaehrlich: {brutto: 41.43, steuer: 5.76},
          vierteljaehrlich: {brutto: 11.38, steuer: 1.58},
          halbjaehrlich: {brutto: 21.77, steuer: 3.03}
        }
      }
    ]
  };

  const tarifierungsparameter: Partial<Tarifierungsparameter> = {
    selbstbeteiligung: true,
    elementarschaeden: false,
    fahrraddiebstahl: false,
    glasbruch: false,
    plz: '60598',
    ueberspannungsschaeden: false,
    wohnflaeche: 30
  };


  beforeEach(() => {
    model = new Model<Tarifierung>({
      tarifierungsparameter
    });

    TestBed.configureTestingModule({
      providers: [
        {provide: TARIFIERUNG, useValue: model}
      ],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    cut = TestBed.inject(TarifeService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#berechneTarife', () => {
    it('should store tarife in model', () => {
      expect(model.get().tarife).toBeUndefined();

      cut.berechneTarife({}).subscribe();

      const req = httpTestingController.expectOne(environment.endpoints.tarife);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedTarife);

      expect(model.get().tarife).toEqual(expectedTarife.tarife);

    });
  });

});


