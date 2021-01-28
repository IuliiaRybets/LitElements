// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  features: {
    zahlungsmodul: true
  },
  endpoints: {
    vorversicherer: './api/vorversicherer/service/test-vorversichererliste.js',
    tarife: './api/tarifierung/hr/angebot/tarife',
    nationalitaeten: './api/nationalitaeten/v2/',
    bankverbindung: './api/bankverbindung/service/bankverbindung/bankdaten',
    plz: './api/plzcheck/service/common/adressen/plz',
    policierung: './api/police/hr/startepolicierung',
    maskenwechsel: './api/maskenwechsel',
    log: './api/bff/log',
    vorabmail: './api/bff/antrag/vorabmail',
    zahlung: './api/bff/zahlung'
  },
  skipGuards: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
