import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/** Don't change this codes to be following:
 *  const platform = platformBrowserDynamic(); platform.bootstrapModule(AppModule).catch(err => console.log(err)); 
 *  (this line of code came from Kendo UI web site sample codes)
 *  Since above lien of code will trigger when running command "ng serve -aot"
 *  browser raised exception "No NgModule metadata found for 'function (){}"
 *
 *  Reference: https://github.com/angular/angular-cli/issues/8193
*/
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));

