// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  weatherAPI_URL: "http://api.openweathermap.org/data/2.5",
  appID: "5a4b2d457ecbef9eb2a71e480b947604",
  iconURL: "https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/",
  defaultExpiryInSeconds: 5, // The time in seconds that it will be out of date and localstorage item
  notificationsDelay: 1500, // The time that a notification will be shown
  cacheCheckAndApiUpdateInterval: 7200 * 1000, // Interval in milliseconds for checking the cache, now is configure to 2 hours (7200 seconds * 1000) to convert to miliseconds
};
