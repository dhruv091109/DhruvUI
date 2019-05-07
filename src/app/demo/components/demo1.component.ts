import { Languages } from '../../_enumerations/languages';
import { TranslateService } from '@ngx-translate/core';
import { APP_PATHS } from '../../_configs/routepaths';
import { Router } from '@angular/router';
import { MessageTypes } from '../../_enumerations/messagetypes';
import { MessageService } from '../../core/services/system/message.service';
import {Component, OnInit} from '@angular/core';
import { UserService } from '../../core/services/system/user.service';

@Component({
   selector: 'app-demo1',
   templateUrl: './demo1.component.html'
 })
export class Demo1Component implements OnInit {
  public selectedLanguage: string = Languages.English_CA.toString();
  public languages = Languages;
  public userInfo: any;
  public accessInfo: any;
  constructor(private messageService: MessageService, private userService: UserService, private router: Router,
     private translateService: TranslateService) { }

     ngOnInit() {
        this.selectedLanguage = this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
     }

     onTestMessageBoxClick() {
     this.messageService.addDialog('Demo.Message1'); // here use resource id. work for multiple languages support.
     // this.alertService.conversaction('Dialog message 2');
     this.messageService.info('Hi, I am showing message in snackbar.');
     // this.alertService.warning('Hi, warning message here.');
     this.messageService.emitMessages();
  }

  onTestErrorLogClick() {
    throw new Error('MY exception');
  }
  /** Get logon user's claim information from web api project. Testing if Identity Server 4 corporating with Web API project. */
  onUserInfoClick() {
    this.userService.getIdentity()
    .subscribe( data => this.userInfo = data);
  }

  onTestMessageBoxAfterRedirectClick() {
    this.messageService.addDialog('Hi, I am in another page. Show message in popup dialog.', MessageTypes.Success, true);
    this.messageService.info('Hi, I am showing message in snackbar.');
    this.messageService.success('Hi, I am in another page. Show success message in snackbar.');
    this.messageService.warning('Hi, I am in another page. Show warning message in snackbar.');
    this.messageService.error('Hi, I am in another page. Show error message in snackbar.');
    this.messageService.emitMessages(true);
    this.router.navigate([APP_PATHS.demo2]);
  }

  onCheckAdminRoleClick() {
    this.userService.checkAdminRole().subscribe(data => this.accessInfo = data);
  }

  onCheckCustomRoleClick() {
    this.userService.checkCustomRole().subscribe(data => this.accessInfo = data);
  }

  onCheckViewPermissionClick() {
     this.userService.checkViewPermission().subscribe(data => this.accessInfo = data);
  }

  onCheckUpdatePermissionClick() {
     this.userService.checkUpdatePermission().subscribe(data => this.accessInfo = data);
  }

  setLanguage(language: Languages) {
    console.log('click set language: ' + language );
    this.selectedLanguage = language.toString();
    this.translateService.use(this.selectedLanguage);
  }
}
