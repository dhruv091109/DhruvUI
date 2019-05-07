import { MultiTranslateHttpLoader } from '../../core/services/system/multi.translations.http.loader.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

/**
 * Corporate with @ngx-translate multiple languages support library.
 * Load multiple languages files from "./assets/i18n/*.json".
 * Reference: https://github.com/ngx-translate/core
 * https://stackoverflow.com/questions/47312962/angular-5-internationalization
 * https://stackblitz.com/github/ngx-translate/example
 *
 * Note: For performance, each module only load json files under the folder with name of module name.
 */
export function AdminModuleTranslateLoader(http: HttpClient) {
    // return new TranslateHttpLoader(http, './assets/i18n/admin/', '.json');
    return new MultiTranslateHttpLoader(http, [
        {prefix: './assets/i18n/core/', suffix: '.json'},
        {prefix: './assets/i18n/admin/', suffix: '.json'},
        // {prefix: './assets/i18n/system.', suffix: '.json'},
        // {prefix: './assets/i18n/label.', suffix: '.json'},
        // {prefix: './assets/i18n/validation.', suffix: '.json'}
      ]);
}

