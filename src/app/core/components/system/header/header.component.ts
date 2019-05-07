import { SecurityOidcService } from '../../../services/system/security.oidc.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName = '';
  isLogin = false;

  constructor(private securityService: SecurityOidcService) {
    //
    // Corporate with login component user login success event. Refresh header by subscribe.
    //
    this.securityService.getUserClaims.subscribe(info => {
      if (info) {
        this.userName = info.name; this.isLogin = true;
      } else {
         this.userName = ''; this.isLogin = false;
      }});
  }

  signout(e) {
    // Prevent from trigger form submit.
    e.preventDefault();
    this.securityService.signout();
  }

  signin(e) {
    e.preventDefault();
    this.securityService.startAuthentication();
  }
}
