import { DatalayerService } from './datalayer.service';
import { VirtualPathEvent } from './events.model';

describe('DatalayerService', () => {

  let cut: DatalayerService;

  beforeEach(() => {
    cut = new DatalayerService();
  });

  it('should push events to the datalayer by using a plain object', () => {
    const event: VirtualPathEvent = {
      event: 'Generic Event',
      eventCategory: 'category',
      pagePath: 'path',
      title: 'title',
      checkoutTyp: 'Tarifrechner',
      portalId: '1234',
      produktId: '0815',
      produktname: 'Hausrat'
    };
    cut.push(event);
    expect(window.dataLayer).toContain(event);
  });

});
