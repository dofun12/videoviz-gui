// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as npm from '../../package.json';

export const environment = {
  production: false,
  remoteUrl : "http://localhost:7777",
  remoteVideoUrl: "http://localhost:7777",
  remoteImageUrl: "http://localhost:7777",
  authUrl:  "http://localhost:7777/auth",
  apiUrl:  "http://localhost:7777/api",
  apiUrlDireto:  "http://localhost:7777/api",
  version: npm.version
  /**
  remoteUrl : "http://192.168.15.102:7777",
  remoteVideoUrl: "http://192.168.15.102:7777",
  remoteImageUrl: "http://192.168.15.102:7777",
  apiUrl:  "http://192.168.15.102:7777/api",
  apiUrlDireto:  "http://192.168.15.102:7777/api"
  **/

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
