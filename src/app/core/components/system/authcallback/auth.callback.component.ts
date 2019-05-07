import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../services/system/message.service';
import { APP_PATHS } from '../../../../_configs/routepaths';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SecurityOidcService } from '../../../services/system/security.oidc.service';

/** After Identity Server 4 completed the logon user authorization, it will redirect to this component. */
@Component({
    selector: 'app-auth-callback',
    templateUrl: './auth.callback.component.html'
  }
)
export class AuthCallbackComponent implements OnInit {

  constructor(private securityService: SecurityOidcService,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.securityService.completeAuthentication().then(() => {
        this.messageService.success('Core.SuccessLogin');
        this.messageService.emitMessages(true); // Show login success message after redirect to home page.
        //
        // Refresh UI langauge based on user's preference culture code.
        //
        const language = this.securityService.getUserLanguage();
        this.translateService.getTranslation(language);
        this.translateService.use(language);
        this.router.navigate([APP_PATHS.home]); // redirect to home.
    });
  }
}
