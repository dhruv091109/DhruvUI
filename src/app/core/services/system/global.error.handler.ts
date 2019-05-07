import { SecurityInterceptorProvider } from '../../interceptors/security.interceptor';
import { SecurityService } from './security.service';
import { Log } from '../../models/system/log';
import { APP_CONFIGS } from '../../../_configs/appconfigs';
import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoggerService} from './logger.service';
import * as StackTrace from 'stacktrace-js';

/**
 * Global Error Handling. Such as send angular client side exceptions to server side.
 * Reference: https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
 * Reference: https://plnkr.co/edit/jCxvLrc1FFGUqYJDqA3q?p=preview
 * Reference: https://www.stacktracejs.com/
 *
 */
 @Injectable()
 export class GlobalErrorHandler extends ErrorHandler {
  constructor(private injector: Injector) { super(); }

  public handleError(inputError: any) {
        /**
        * If required, we are able to send angular internal exceptions to server side as log.
        * Note: Check performance issues if needed. Don't always enable it.
        */
        try {
            const securityService = this.injector.get(SecurityService);
            const loggerService = this.injector.get(LoggerService);
            const location = this.injector.get(LocationStrategy);
            const message = inputError.message ? inputError.message : inputError.toString();
            const path = location instanceof PathLocationStrategy ? location.path() : '';
            //
            // get the stack trace, lets grab the last 10 stacks only
            //
            StackTrace.fromError(inputError).then(stackframes => {
                const stack = stackframes
                    .splice(0, 10)
                    .map(function(sf) {
                    return sf.toString();
                    }).join('\n');
                //
                // log on the server. Corporate with web api call.
                //
                let userName = '';
                let userId = '';
                const user = securityService.getLogonUser();
                if (user && user.token) {
                   userName = user.userName;
                   userId = user.id;
                }

                loggerService.log(new Log(userName, userId, path, message, stack))
                    .subscribe( // Note: Important to call '.subscribe' here since HttpClient post raised exception "Http404.".
                        data => {
                            // Do nothing here
                        },
                        error => {
                            // Do nothing here
                        });
            });
            //
            // IMPORTANT: Rethrow the error otherwise it gets swallowed!!!
            //
            // continue parent error handler's throw error process;
             super.handleError(inputError);
        } catch (ex) {
            // Hide exception in case circle calls.
        }
    }
 }

/**
 * Provider POJO for the interceptor
 */
export const GlobalErrorHandlerProvider = {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
    // multi: true, //Note: Important!!! Don't set multi:true here. Disabled.
};

