import { WEB_API_URLS } from '../../_configs/webapiurls';
import { APP_PATHS } from '../../_configs/routepaths';
import { LoaderService } from '../services/system/loader.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

/**
 * Intercepts the HTTP responses, show loader for any http request.
 * Reference: https://stackoverflow.com/questions/46544842/loader-using-httpclient-interceptor-angular-4
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}
   /**
     * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
     * @see HttpInterceptor
     * @param req the outgoing HTTP request
     * @param next a HTTP request handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Don't display loader UI for internal client side error logging in server side.
        if (req.url.indexOf(WEB_API_URLS.logging) < 0 ) {
           this.loaderService.showLoader();
        }

        return next.handle(req).do((response) => {
            this.loaderService.hideLoader();
        },
       (error) => {
           this.loaderService.hideLoader();
       });
    }
}

/**
 * Provider POJO for the interceptor
 */
export const LoaderInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
};
