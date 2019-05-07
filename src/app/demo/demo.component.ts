import { Languages } from '../_enumerations/languages';
import { SecurityOidcService } from '../core/services/system/security.oidc.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
/**
 * Admin Module bootstrap component.
 * It is container for all other admin components.
 **/
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  constructor(private translateService: TranslateService, private securityService: SecurityOidcService) {
        const language = this.securityService.getUserLanguage();
        this.translateService.getTranslation(language);
        this.translateService.use(language);
   }
}
