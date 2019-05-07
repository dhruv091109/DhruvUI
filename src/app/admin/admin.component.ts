import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

/**
 * Admin Module bootstrap component.
 * It is container for all other admin components.
 **/
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {

    constructor(private translateService: TranslateService) {
        this.translateService.getTranslation(translateService.currentLang);
        this.translateService.use(translateService.currentLang);
    }
}
