import { CustomFormsModule } from 'ng4-validators';
import { Languages } from '../../_enumerations/languages';
import { TranslateService } from '@ngx-translate/core';
import { SecurityService } from '../services/system/security.service';
import { User } from '../models/system/user';
import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,  HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

/**
 * Any http request send out, application auto includes current login user's oauth2 token in the http request's header.
 * Further, application includes current running language's culture code in the http request's header.
 * Work for server side authentication and multiple languages support.
 */
@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
    constructor(private securityService: SecurityService, private translateService: TranslateService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let language: string;
     //
     // Add authorization header with jwt token if available.
     //
     const currentUser: User = this.securityService.getLogonUser();
        //
        // If there is logon user, check logon user's prefer language.
        //
        if (currentUser && currentUser.token) {

          if (currentUser.language) {
             language = currentUser.language.toString();
          }
          //
          // If logon user no language setup, select application's default language as culture code and send it to server side.
          //
          if (!(language && language.length > 0)) {
             language = this.translateService.currentLang;
          }

          if (!(language && language.length > 0)) {
             language = Languages.English_CA.toString();
          }

          request = request.clone({
             setHeaders: { authorization: `Bearer ${currentUser.token}`, currentLanguage: language}
          });
        } else {
           // If there is no logon user, system still need to pass default langauge as culture code back to server side.
           language = this.translateService.currentLang;

           if (!(language && language.length > 0 )) {
               language = Languages.English_CA.toString();
           }

           request = request.clone({
              setHeaders: { currentLanguage: language}
           });
        }

     return next.handle(request);
   }
}

/**
 * Provider POJO for the interceptor
 */
export const SecurityInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SecurityInterceptor,
  multi: true
};
