import { ThemeComponent } from '../../components/system/theme/theme.component';
import { Subject } from 'rxjs/Subject';
import { Themes } from '../../../_enumerations/themes';
import { SecurityService } from './security.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThemeService {
    /** Current selected theme. Work for UI. setup based on logic at runtime. */
    // private currentTheme = new Subject<any>();
    private currentTheme = Themes.kendoDefault;
    constructor(private authorHelper: SecurityService) { }
   /**
    * Get theme based on business logic. Such as get theme based on logon user's preference theme. 
    * TODO. Change it based on other logic.
    */
   /*
   getTheme(): Observable<any> {
        console.log('getTheme called');
        const user = this.authorHelper.getLogonUser();
        if (user && user.theme) {
            console.log('UserName: ' + user.userName + ' theme: ' + user.theme);
            this.currentTheme.next({theme: user.theme});
        } else {
            this.currentTheme.next({theme: Themes.kendoDefault});
        }
        return this.currentTheme.asObservable();
   }
   */

   getTheme(): Themes {
    const user = this.authorHelper.getLogonUser();
    if (user && user.theme) {
        console.log('UserName: ' + user.userName + ' theme: ' + user.theme);
        // this.currentTheme.next({theme: user.theme});
        this.currentTheme = user.theme;
    }

    if (!this.currentTheme) {
      this.currentTheme = Themes.kendoDefault;
    }

    return this.currentTheme;
  }
}
