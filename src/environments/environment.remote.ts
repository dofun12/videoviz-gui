// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// @ts-ignore
import * as npm from '../../package.json';

export const environment = {
  production: false,
  remoteUrl : "http://192.168.15.102:9090",
  remoteVideoUrl: "http://192.168.15.102:9090",
  remoteImageUrl: "http://192.168.15.102:9090",
  authUrl:  "http://192.168.15.102:9090/auth",
  apiUrl:  "http://192.168.15.102:9090/api",
  apiUrlDireto:  "http://192.168.15.102:9090/api",
  version: npm.version
  /**
   remoteUrl : "http://192.168.15.102:8080",
   remoteVideoUrl: "http://192.168.15.102:8080",
   remoteImageUrl: "http://192.168.15.102:8080",
   apiUrl:  "http://192.168.15.102:8080/api",
   apiUrlDireto:  "http://192.168.15.102:8080/api"
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
