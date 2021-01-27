import { GlobalConfiguration } from '../provider.definitions';
import { DownloadEventFactory } from './download-event.factory';

describe('DownloadEventFactory', () => {

  let cut: DownloadEventFactory;
  const globalConfiguration: GlobalConfiguration = {
    produktname: 'Hausrat',
    produktId: '10100',
    produktKategorie: 'Bauen + Wohnen',
    vertragslaufzeit: '1 Jahr',
    portalId: '1234'
  };

  beforeEach(() => {
    cut = new DownloadEventFactory(globalConfiguration);
  });

  it('should create a DownloadEvent for downloads', () => {
    const downloadEvent = cut.createDownloadEvent('test.pdf', 'Download');

    expect(downloadEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Downloads',
      eventAction: 'Produkt',
      eventLabel: 'test.pdf - Download',
      ...globalConfiguration
    });
  });

  it('should create a DownloadEvent for Emails', () => {
    const downloadEvent = cut.createDownloadEvent('test.pdf', 'Mail');

    expect(downloadEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Downloads',
      eventAction: 'Produkt',
      eventLabel: 'test.pdf - per Mail',
      ...globalConfiguration
    });
  });
});
