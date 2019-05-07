import { SecurityService } from '../../../services/system/security.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  // styleUrls: ['./header.component.scss']
})
export class FooterComponent implements OnInit {
   timeZone = '';
   appDateTime: Date;
   constructor(private securityService: SecurityService ) {
    //
    // Corporate with login component user login success event. Refresh header by subscribe.
    //
    this.securityService.getLogonUserInfo.subscribe(info => { this.timeZone = info.timeZone;
        if (!this.timeZone || this.timeZone === '') {
            this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
    });
    this.utcTime();
}

   ngOnInit() {
        const user = this.securityService.getLogonUser();

        if (user && user.timeZone) {
            this.timeZone = user.timeZone;
        } else {
            this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
   }

   utcTime(): void {
        setInterval(() => {
            this.appDateTime = new Date();
        }, 1000);
   }
}

