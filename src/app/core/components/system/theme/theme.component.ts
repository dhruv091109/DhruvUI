import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/system/theme.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Themes } from '../../../../_enumerations/themes';

/**
 * The solution of switch application global themes at runtime.
 * Reference: https://shekhargulati.com/2018/01/16/dynamically-loading-css-in-angular-5-application/
 * Note: By desgin, the associated themes css files are staying in folder "assets/themes/".
 * Each theme folder must contain two css files:
 * One called "all.css" for theme.
 * Second called "custom.css" for additinal custom css.
 * Note: tag "app-theme" must set in the most top place in "app.component.html".
*/
@Component({
   selector: 'app-theme',
   templateUrl: './theme.component.html'
})
export class ThemeComponent implements OnInit {
   // customCssUrl = '';
   // themeUrl = '';
   public theme = Themes.kendoDefault;
   constructor(private themeService: ThemeService, public sanitizer: DomSanitizer) {
    this.theme = this.themeService.getTheme();
   }

   ngOnInit() {
       // this.theme = this.themeService.getTheme(); // .subscribe(response => {
        // this.themeUrl = '/assets/themes/' + response.theme.toString() + '/all.css';
        // this.customCssUrl = '/assets/themes/' + response.theme.toString() + '/custom.css';
        // this.theme = response.theme;
    }
}
