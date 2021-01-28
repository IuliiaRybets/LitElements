export const environment = {
  production: true,
  endpoints: {
    vorversicherer: './api/vorversicherer/service/test-vorversichererliste.js',
    nationalitaeten: './api/nationalitaeten/v2/',
    tarife: './api/tarifierung/hr/angebot/tarife',
    bankverbindung: './api/bankverbindung/service/bankverbindung/bankdaten',
    plz: './api/plzcheck/service/common/adressen/plz',
    policierung: './api/police/hr/startepolicierung',
    maskenwechsel: './api/maskenwechsel',
    log: './api/bff/log',
    vorabmail: './api/bff/antrag/vorabmail',
    zahlung: './api/bff/zahlung'
  },
  features: {
    zahlungsmodul: true
  },
  skipGuards: false
};
