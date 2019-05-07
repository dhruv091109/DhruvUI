import { DemoKendoComponentsComponent } from '../../demo/components/kendo-sample-ui/kendo-components/demo.kendo.components.component';
import { SecurityOidcService } from '../services/system/security.oidc.service';
import { CustomFormsModule } from 'ng4-validators';
import { Languages } from '../../_enumerations/languages';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/system/user';
import {Injectable} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

/**
 * Inject csp (Content Security Policy) settings into headers for each http request.
 */
@Injectable()
export class HttpCSPHeadersInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          request = request.clone({
               setHeaders: {
               'Content-Security-Policy': 'script-src self unsafe-eval;',
               'X-Frame-Options': 'SAMEORIGIN',
               'X-XSS-Protection': '1; mode=block',
               'X-Content-Type-Options': 'nosniff',
               'Referrer-Policy': 'origin',
               'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
               }
          });

          return next.handle(request);
          /*
          return next.handle(request).map(response => {
             if (response instanceof HttpResponse)  {
                response.headers.append('Content-Security-Policy', 'script-src self unsafe-eval;');
                response.headers.append('X-Frame-Options', 'SAMEORIGIN');
                response.headers.append('X-XSS-Protection', '1; mode=block');
                response.headers.append('X-Content-Type-Options', 'nosniff');
                response.headers.append('Referrer-Policy', 'origin');
                response.headers.append('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
             }

             return response;
          });
          */
     }
}

/**
 *  Http CSP headers interceptor provider.
 */
export const HttpCSPHeadersInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpCSPHeadersInterceptor,
  multi: true
};
