// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'assets/db',
  apiFallbackUrl: 'http://localhost:3001',
  version: require('../../package.json').version,
  firebase: {
    apiKey: 'AIzaSyDa4Mw2-8a42A6LQ4bd6YbZLY9cXmofjcI',
    authDomain: 'maydayworld-55555.firebaseapp.com',
    databaseURL: 'https://maydayworld-55555.firebaseio.com',
    projectId: 'maydayworld-55555',
    storageBucket: 'maydayworld-55555.appspot.com',
    messagingSenderId: '507045645226',
    appId: '1:507045645226:web:7bfcb838e1a8cb47'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
