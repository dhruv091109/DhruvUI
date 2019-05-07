import { WEB_API_URLS } from '../../../_configs/webapiurls';
import { APP_CONFIGS } from '../../../_configs/appconfigs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Log } from '../../models/system/log';
import 'rxjs/add/operator/map';

/**
 * Call web api to send angular application client side errors to server side as log.
 * Reference: https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
 * Reference: https://plnkr.co/edit/jCxvLrc1FFGUqYJDqA3q?p=preview
 * Reference: https://www.stacktracejs.com/
 */
@Injectable()
export class LoggerService {
    constructor(private http: HttpClient) { }
    /** Call server side web api and post error json data to server side.
     *  error has properties such as "message", "path", "stack".
     *  Corporate with GlobalErrorHandler.
     *  Note: error stack collected by "stacktrace-js". Reference: https://www.stacktracejs.com/
    */
    log(log: Log) {
        try {
            if (APP_CONFIGS.sendClientLogToServer) {
                // const headers = new HttpHeaders().set('content-type', 'application/json');
                // console.log('log json: ' + JSON.stringify(log));
                return this.http.post<Log>(WEB_API_URLS.logging, log);
            } else {
                console.log('catched exception: ' + JSON.stringify(log));
            }
        } catch (ex) {
            // Hide exception here. Ignore any internal exception for logging process.
            // throw ex;
        }
    }
 }
