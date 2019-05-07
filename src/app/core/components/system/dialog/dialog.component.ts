import { MessageTypes } from '../../../../_enumerations/messagetypes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../../services/system/message.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

/**
 * Show popup dialog box for showing additinal application messages for user in UI.
 * Note: This popup dialog box is seperated from message box. They are able to show at same time.
 * Note: Now, we only support dialog box for conversation interaction.
 * Reference: http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
 */
@Component({
   selector: 'app-dialog',
   templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit, OnDestroy {
   title: string;
   content: string;
   dialogOpened = false;
   subscription: Subscription;
   messageType: MessageTypes;
   constructor(private messageService: MessageService, private translateService: TranslateService) { }

   ngOnInit() {
      this.subscription = this.messageService.getDialog().subscribe(conversation => {
         if (conversation) {
           this.messageType = conversation.type;
           if (conversation.type) {
                 switch (conversation.type) {
                   case 'Info': this.title = this.translateService.instant('Core.Information'); break ;
                   case 'Success': this.title = this.translateService.instant('Core.Success'); break ;
                   case 'Warning': this.title = this.translateService.instant('Core.Warning'); break ;
                   case 'Error': this.title = this.translateService.instant('Core.Error'); break ;
                   default: this.title = this.translateService.instant('Core.Information') ;
                 }
           }
           // Try to translate message with multiple languages (if message is key)
           this.content = this.translateService.instant(conversation.message);
           this.dialogOpened = true;
          }
        });
   }

   ngOnDestroy() {
     // unsubscribe to ensure no memory leaks
     this.subscription.unsubscribe();
   }

   /** Close the dialog */
   public close(status) {
    this.dialogOpened = false;
  }
}
