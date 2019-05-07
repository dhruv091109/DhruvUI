import { APP_CONFIGS } from './appconfigs';

/**
* Any server side web api call urls put here.
* It is applied in global.
*/
export class WebApiUrls {
    /**
    * User Login web Api call. "/user/authenticate".
    * public property.
    */
    public readonly login = APP_CONFIGS.apiRootUrl + 'api/user/authenticate';
    /**
     * client site exception logging in server side.
     * Web api call. "/logger/logging".
     */
    public readonly logging = APP_CONFIGS.apiRootUrl + 'api/logger/addlog';

    /** Regiser new user */
    public readonly register = APP_CONFIGS.apiRootUrl + 'api/user/register';

    public readonly accessByAdminRole = APP_CONFIGS.apiRootUrl + 'api/identity/accessbyadminrole';
    public readonly accessByCustomRole = APP_CONFIGS.apiRootUrl + 'api/identity/accessbycustomrole';
    public readonly accessByViewAccessRight = APP_CONFIGS.apiRootUrl + 'api/identity/accessbyviewaccessright';
    public readonly accessByUpdateAccessRight = APP_CONFIGS.apiRootUrl + 'api/identity/accessbyupdateaccessright';
    public readonly getidentity = APP_CONFIGS.apiRootUrl + 'api/identity';

}
/**
 * Global Const contains all web api all urls.
 *
 */
export const WEB_API_URLS = new WebApiUrls();