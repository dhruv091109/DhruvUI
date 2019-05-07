import { Themes } from '../../../_enumerations/themes';
import { Languages } from '../../../_enumerations/languages';
/**
 * Logon user entity.
 */
export class User {
    /** Guid here for UserId. Primary key. */
    id: string;
    /** userName should be unique. Note: This property cannbe named as "username".
     * I am not sure why. data binding has issues if named it as "username" */
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    /** Default language is English. Logon user's prefer language. Work for multiple language support. */
    language: Languages;
    permissions: string[];
    /** User account's associated theme. Work for setup application's theme at runtime dynamic based on business logic.*/
    theme: Themes;
    /**
     *  User's prefer time zone.
     * Time zone codes: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     * value such as "America/New_York", "America/Montreal", "America/Toronto", "Asia/Shanghai",
     * "Asia/Singapore", "Asia/Taipei", "Europe/Berlin", "Europe/London", "Europe/Moscow"
     */
    timeZone: string;
}
