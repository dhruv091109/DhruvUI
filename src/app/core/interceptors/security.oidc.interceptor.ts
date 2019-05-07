import { DemoKendoComponentsComponent } from '../../demo/components/kendo-sample-ui/kendo-components/demo.kendo.components.component';
import { SecurityOidcService } from '../services/system/security.oidc.service';
import { CustomFormsModule } from 'ng4-validators';
import { Languages } from '../../_enumerations/languages';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/system/user';
import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

/**
 * Any http request send out, application auto includes current login user's oauth2 token in the http request's header.
 * Further, application includes current running language's culture code in the http request's header.
 * Work for server side authentication and multiple languages support.
 * Assess token got from Identity Server 4.
 */
@Injectable()
export class SecurityOidcInterceptor implements HttpInterceptor {
    constructor(private securityService: SecurityOidcService, private translateService: TranslateService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const language = this.securityService.getUserLanguage();
     //
     // Add authorization header with jwt token if available.
     //
        //
        // If there is logon user, check logon user's prefer language.
        //
        if (this.securityService.isLoggedIn()) {
          request = request.clone({
             setHeaders: { authorization: `${this.securityService.getAuthorizationHeaderValue()}`, currentLanguage: language}
          });
        } else {
           // If there is no logon user, system still need to pass default langauge as culture code back to server side.
           request = request.clone({
              setHeaders: { currentLanguage: language}
           });
        }

     return next.handle(request);
   }
}

/**
 * Provider POJO for the oidc interceptor
 */
export const SecurityOidcInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SecurityOidcInterceptor,
  multi: true
};
