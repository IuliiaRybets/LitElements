import { instance, mock, when } from 'ts-mockito';
import { ApplicationProvider } from '../data-providers/application.provider';
import { ErrorEventFactory } from './error-event.factory';

describe('ErrorEventFactory', () => {

  let cut: ErrorEventFactory;
  let applicationProvider: ApplicationProvider;

  beforeEach(() => {
    applicationProvider = mock(ApplicationProvider);
    cut = new ErrorEventFactory(instance(applicationProvider));
  });

  it('should create an ErrorEvent with for the given field with its error', () => {
    when(applicationProvider.activeApplication).thenReturn('Tarifierung');

    const errorEvent = cut.createErrorEvent('Geburtsdatum', 'Sie sind zu alt');

    expect(errorEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Fehlermeldungen',
      eventAction: 'Tarifierung',
      eventLabel: 'Geburtsdatum - Sie sind zu alt',
    });
  });
});
