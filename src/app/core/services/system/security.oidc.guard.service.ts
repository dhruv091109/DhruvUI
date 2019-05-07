import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SecurityOidcService } from './security.oidc.service';
import { Observable } from 'rxjs/Observable';

/**
* The auth guard is used to prevent unauthenticated users from accessing restricted routes.
* NOTE: While it would be possible to bypass this client side authentication check by manually
* adding a 'currentUser' object to local storage using browser dev tools,
* this would only give access to the client side routes/components,
* it wouldn't give access to any real secure data from the server api
* because a valid authentication token (JWT) is required for this.
*/
@Injectable()
export class SecurityOidcGuardService implements CanActivate {
  constructor(private authService: SecurityOidcService, private messageService: MessageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
     let result = false;
     if (this.authService.isLoggedIn()) {
        //
        // Check user roles and permissions here.
        //
        const expectedRole = route.data.role;
        console.log('admin expected role:' + expectedRole);
        if (expectedRole) {
            result = (this.authService.checkUserRole(expectedRole));
        } else {
            result = true;
        }
      } else {
        result = false;
      }

      if (!result) {
        // redirect to identity server login page. require user login.
        // this.authService.startAuthentication();
        this.messageService.warning('Core.UnAuthorized');
        this.messageService.emitMessages();
      }
      return result;
  }
}
