/** The app config class is used to store application config variables (like the api endpoint url)
* in a single place that's easily injected into any component.
* It is applied in global.
*/
export class AppConfigs {
    /** Default date short format. */
    public readonly dateFormat = 'yyyy-MM-dd';
    /** Default datetime long format. */
    public readonly dateTimeFormat = 'yyyy-MM-dd h:mm:ss a';
    /** Work for process which difference between development environment and production environment. */
    public readonly isProductionMode = false;
    /** If the web api server is hosting in differnt domain or port, need to use this setting to generate api call url. */
    public readonly apiRootUrl = 'http://localhost:55799/';
    /** Default language for application. Work for multiple language support. */
    public readonly defaultLanguage = 'en';
    /** Defined the application applied theme. */
    public readonly defaultTheme = 'pink';
    /** If value = true, send angular application logging information or exceptions back to server side. corporate with web api call.
     * Note: enable this setting could cause performance issue. Convern.
    */
    public readonly sendClientLogToServer = true;

    public readonly enableDynamicTheme = false;
  }

  /**
   * Global const contains all custom settings.
   */
  export const APP_CONFIGS = new AppConfigs();