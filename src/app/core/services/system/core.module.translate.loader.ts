import { MultiTranslateHttpLoader } from './multi.translations.http.loader.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

/**
 * Corporate with @ngx-translate multiple languages support library.
 * Load multiple languages files from "./assets/i18n/*.json".
 * Reference: https://github.com/ngx-translate/core
 * https://stackoverflow.com/questions/47312962/angular-5-internationalization
 * https://stackblitz.com/github/ngx-translate/example
 *
 * Note: For performance, each module only load json files under the folder with name of module name.
 */
export function CoreModuleTranslateLoader(http: HttpClient) {
     // return new TranslateHttpLoader(http, './assets/i18n/core/', '.json');
     return new MultiTranslateHttpLoader(http, [
        {prefix: './assets/i18n/core/', suffix: '.json'}
        // {prefix: './assets/i18n/', suffix: '.json'},
        // {prefix: './assets/i18n/system.', suffix: '.json'},
        // {prefix: './assets/i18n/label.', suffix: '.json'},
        // {prefix: './assets/i18n/validation.', suffix: '.json'}
      ]);
}

/*
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.fromPromise(System.import(`../i18n/${lang}.json`));
  }
}
*/

