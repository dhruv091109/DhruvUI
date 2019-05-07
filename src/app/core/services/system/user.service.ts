import { WEB_API_URLS } from '../../../_configs/webapiurls';
import { APP_CONFIGS } from '../../../_configs/appconfigs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/system/user';
/**
* User account information management associated web api calls
* Need to login first.
*/
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<User[]>(APP_CONFIGS.apiRootUrl + '/api/users');
    }
    getById(id: string) {
        return this.http.get('/user/' + id);
    }
    register(user: User) {
        return this.http.post<User>(WEB_API_URLS.register, user)
        .map(response => {
            // login successful if there's a jwt token in the response. It is user.token.
            //this.setLogonUser(user);
            //console.log('login method called. username:' + user.userName);
            //this.getLogonUserInfo.emit({userName: user.userName, firstName: user.firstName, lastName: user.lastName, isLogin: true});
            return response;
        });
    }
    update(user: User) {
        return this.http.put('/api/user/' + user.id, user);
    }
    delete(id: number) {
        return this.http.delete('/api/user/' + id);
    }
    /** Return logon user claims details info after open id connect authentication done. work for testing purpose. */
    getIdentity() {
       return this.http.get(WEB_API_URLS.getidentity);
    }

    checkAdminRole() {
       return this.http.get(WEB_API_URLS.accessByAdminRole);
    }

    checkCustomRole() {
      return this.http.get(WEB_API_URLS.accessByCustomRole);
    }

    checkViewPermission() {
        return this.http.get(WEB_API_URLS.accessByViewAccessRight);
    }

    checkUpdatePermission() {
        return this.http.get(WEB_API_URLS.accessByUpdateAccessRight);
    }
}
