/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
*/


import { SecurityOidcService } from './core/services/system/security.oidc.service';

import { Component, ViewEncapsulation, OnInit } from '@angular/core';
 import { Languages } from './_enumerations/languages';
 // import { TranslateLoader } from '@ngx-translate/core';
// import { APP_CONFIGS } from './_configs/appconfigs';
// import { ThemeComponent } from './core/components/system/theme/theme.component';
 import { TranslateService} from '@ngx-translate/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   // Note: It is empty scss by default. we will define application's global theme in theme.component.ts.
   // styleUrls: ['./app.component.scss'],
   // styleUrls: APP_CONFIGS.enableDynamicTheme ? [] : ['./app.component.kendo.default.scss'],
    styleUrls: ['./themes/OneUI/all.scss'],
   //styleUrls: ['./themes/OneUI.DynamicTheme/all.scss'],
   // styleUrls: ['./app.component.kendo.blue.scss'],
   // prevent style encapsulation. Work for dynamic setup application's theme.
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  // title = 'Dhruv Angular 5 template';
  // enableDynamicTheme = APP_CONFIGS.enableDynamicTheme;
  constructor(private translateService: TranslateService, private securityService: SecurityOidcService ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.addLangs([Languages.English_CA, Languages.French_CA, Languages.Chinese_CHS]);
    // this.translateService.setDefaultLang(Languages.English_CA);
    const language = this.securityService.getUserLanguage();
    this.translateService.getTranslation(language);
    this.translateService.use(language);
  }
}
