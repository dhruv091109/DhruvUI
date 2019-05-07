import { APP_PATHS } from '../../../_configs/routepaths';
import { SecurityService } from './security.service';
import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
* The auth guard is used to prevent unauthenticated users from accessing restricted routes.
* NOTE: While it would be possible to bypass this client side authentication check by manually
* adding a 'currentUser' object to local storage using browser dev tools,
* this would only give access to the client side routes/components,
* it wouldn't give access to any real secure data from the server api
* because a valid authentication token (JWT) is required for this.
*
* Note: this service will be replaced by new service called SecurityOidcGuardService.
*/
@Injectable()
export class SecurityGuard implements CanActivate  {
   constructor(private securityService: SecurityService, private router: Router) { }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.securityService.getLogonUser()) {
          // TODO. Put additional user roles and permission checking code here.
           return true;
      } else {
        // not logged in so redirect to login page with the return url.
        this.router.navigate([APP_PATHS.login], {queryParams: {returnUrl: state.url}});
        return false;
      }
    }
}
