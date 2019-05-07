import { ErrorResponse } from '../models/system/errorresponse';
import { MessageService } from '../services/system/message.service';
import { element } from 'protractor';
import { Message } from '../models/system/message';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 * Reference: https://stackoverflow.com/questions/46019771/catching-errors-in-angular-httpclient
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}
    /**
     * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
     * @see HttpInterceptor
     * @param req the outgoing HTTP request
     * @param next a HTTP request handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch(errorResponse => {
                if (errorResponse instanceof HttpErrorResponse) {
                    if (errorResponse.status === 400) {
                         //
                         // try to collect server side business model's validation error here.
                         // Corporate with .net returned BadRequest(ModelState).
                         const validationErrorDictionary = errorResponse.error;
                         if (validationErrorDictionary) {
                            for (var fieldName in validationErrorDictionary) {
                                if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                                    const msg = validationErrorDictionary[fieldName]; // this could be arry such as [''] for business model validations.
                                    this.messageService.error(msg.join('<br/>'));
                                }
                            }
                        }
                    } else if (errorResponse.status === 401) {
                        this.messageService.error('Core.UnAuthorized'); // Error Code. Work for ngx-translate to translate with multiple languages.
                    } else if (errorResponse.status === 0) {
                         this.messageService.error('Core.NetworkIssue'); // Error Code. Work for multiple languages support.
                    }
                       // Publish the server side validation messages to UI.
                       this.messageService.emitMessages();
                }

                return _throw(errorResponse); //Observable.throw(errorResponse); // _throw(errMsg);
            });
    }
}

/**
 * Provider POJO for the interceptor
 */
export const HttpErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
};

