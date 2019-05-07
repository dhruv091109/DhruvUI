import { LabelModule } from '@progress/kendo-angular-label';
import { Languages } from '../../../_enumerations/languages';
import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Output, EventEmitter } from '@angular/core';
/**
 * Work for user authorization.
 * Work for communicate with Identity Server 4 solution with Open Id Connect from Angular6 application.
 * Corporate with oidc-client library.
 * Reference: https://www.scottbrady91.com/Angular/SPA-Authentiction-using-OpenID-Connect-Angular-CLI-and-oidc-client
 */
@Injectable()
export class SecurityOidcService {
  private manager: UserManager = new UserManager(getOidcClientSettings());
  /** User is defined in oidc-client library. */
  private user: User = null;

    /**
     * Subject() is doing both Emitting data and Subscribing it in another component.
     * So its the best way to compare with Emitting using Output.
     */
    @Output() getUserClaims: EventEmitter<any> = new EventEmitter();

  /** Each time initialize service, system call getUser() to get current logon user's information. */
  constructor() {
    this.manager.getUser().then(user => {
        if (user && !user.expired) {
          this.user = user;
          this.getUserClaims.emit(this.getClaims());
        }
    });
  }

  /** Check if user is login. */
  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  checkUserRole(role: string): boolean {
      if (this.isLoggedIn()) {
         if (this.user.profile.roles) {
              const roles = this.user.profile.roles.split(',');
              if (roles.find(x => x === role)) {
                 return true;
              } else {
                return false;
              }
         } else {
            return false;
         }
      } else {
        return false;
      }
  }

  /** Get current logon user's associated claims settings. */
  getClaims(): any {
     console.log('getClaims: ' + JSON.stringify(this.user));
     if (this.isLoggedIn()) {
         return this.user.profile;
     } else {
       return null;
     }
  }

  /**
   * Return logon user's preference culture code (langauge).
   *  If no logon user or logon user no preference language, return default en-ca. 
   * */
  getUserLanguage(): string {
    if (this.isLoggedIn()) {
       if (this.user.profile.locale) {
           console.log('user locale:'  + this.user.profile.locale);
            return this.user.profile.locale;
       } else {
           return Languages.English_CA;
       }
    } else {
       return Languages.English_CA;
    }
  }

  /** Return current logon user's Access Token */
  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  /** Send request to Identity Server 4 for user login process. */
  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  /** User sign out. */
  signout() {
   this.manager.signoutRedirect();
   this.getUserClaims.emit({userName: '',  firstName: '', lastName: '', isLogin: false}); // Clean up user name.
  }

  /** Get logon user identity from Identity Server 4.
   * Keep logon user in local storage.
   * */
  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
        this.user = user;
        this.getUserClaims.emit(this.getClaims());
    });
  }
}

/** Return settings for Identity Server 4 settings and authorization process setup.
 *  Note: Same settings in IdentityServer project appsettings.json.
 */
export function getOidcClientSettings(): UserManagerSettings {
  return {
      /** Identity Server 4 host url. */
    authority: 'http://localhost:5000/',
    client_id: 'DhruvOneUI',
    /** Current application redirection url when Identity Server authorization process completed successfully. */
    redirect_uri: 'http://localhost:4200/auth-callback',
    /** After sign out, current application redirection url.  */
    post_logout_redirect_uri: 'http://localhost:4200/',
    /** Settings corporate with Identity Server 4. */
    response_type: 'id_token token',
    /** Settings corporate with Identity Server 4.
     * Note: OneUIWebApi means single page app allow to access OneUIWebApi portal.
     * Note: custom.profile means return additinal custom resources such as custom roles, 
     * access rights as claims to client side. contains in token.
     * custom.profile settings in Resources.cs.
     **/
    scope: 'openid profile email OneUIWebApi custom.profile',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    /** Refresh token redirection url.  */
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
