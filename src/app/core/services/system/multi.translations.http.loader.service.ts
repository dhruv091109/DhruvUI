import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/fromPromise';

/**
 * Load multiple json files in assets/i18n folder. Work for multiple languages support.
 * Reference: https://github.com/ngx-translate/core/issues/199
 */
export class MultiTranslateHttpLoader implements TranslateLoader {
    constructor(private http: HttpClient,
                public resources: { prefix: string, suffix: string }[] = [{
                  prefix: './assets/i18n/core/',
                  suffix: '.json'
                }]) {}

    public getTranslation(lang: string): any {
      return Observable.forkJoin(this.resources.map(config => {
        return this.http.get(`${config.prefix}${lang}${config.suffix}`);
      })).map(response => {
        return response.reduce((a, b) => {
          return Object.assign(a, b);
        });
      });
    }

    /*
    public getTranslation(lang: string): any {
        return Observable.forkJoin(this.resources.map(config => {
          return Observable.fromPromise(System.import(`${config.prefix}${lang}${config.suffix}`)) ;
        })).map(response => {
          return response.reduce((a, b) => {
            return Object.assign(a, b);
          });
        });
      }
      */
  }
