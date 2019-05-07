import { TranslateService } from '@ngx-translate/core';
import { APP_CONSTS } from '../../../_configs/consts';
import { WEB_API_URLS } from '../../../_configs/webapiurls';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/system/user';
import { APP_PATHS } from '../../../_configs/routepaths';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Output, EventEmitter } from '@angular/core';

/**
* Security service. Work for user login and security check.
* Note: this service will be replaced by new service called SecurityOidcService.
*/
@Injectable()
export class SecurityService {
    /**
     * Subject() is doing both Emitting data and Subscribing it in another component.
     * So its the best way to compare with Emitting using Output.
     */
    @Output() getLogonUserInfo: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient, private router: Router, private translateService: TranslateService) { }
        /**
        * Login application with user name and password. Set request to server side.
        */
        login(username: string, password: string) {
            // Post user object data to server side web api.
            return this.http.post<User>(WEB_API_URLS.login, { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response. It is user.token.
                this.setLogonUser(user);
                // console.log('login method called. username:' + user.userName);
                this.getLogonUserInfo.emit({userName: user.userName, firstName: user.firstName,
                    lastName: user.lastName, isLogin: true, timeZone: user.timeZone, language: user.language});
                return user;
            });
        }
    /**
    * Logout current user from application.
    */
    logout() {
        // remove user from local storage to log user out
        this.removeLogonUser();
        this.getLogonUserInfo.emit({userName: '',  firstName: '', lastName: '', isLogin: false}); // Clean up user name.
        this.router.navigate([APP_PATHS.login]);
        // this.router.navigateByUrl(APP_PATHS.login);
    }

    /**
     * Get current logon user object. No logon, return null.
     */
    getLogonUser(): User {
        if (localStorage.getItem(APP_CONSTS.currentUser)) {
            return JSON.parse(localStorage.getItem(APP_CONSTS.currentUser)) as User;
        } else {
            return null;
        }
    }

    /**
    * Save logon user entity into javascript local storage.
    */
    setLogonUser(user: User) {
       if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(APP_CONSTS.currentUser, JSON.stringify(user));

            console.log('logon user\'s language: ' + user.language);
            // If user has specified language, apply the language in UI. Work for multiple language support.
            if (user.language) {
                // this.translateService.getTranslation(user.language);
                // this.translateService.setDefaultLang(user.language);
                this.translateService.use(user.language);
            }
        }
    }
    /**
    * Remove logon user entity from javascript local storage.
    */
    removeLogonUser() {
        localStorage.removeItem(APP_CONSTS.currentUser) ;
    }
}
