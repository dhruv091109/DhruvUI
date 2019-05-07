import { Message } from '../../../models/system/message';
import { TranslateService } from '@ngx-translate/core';
import { MessageTypes } from '../../../../_enumerations/messagetypes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../../services/system/message.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

/**
 *  Global messages box display system interactive messages on UI.
 * Note: Displayed messages will be hidden after 20 seconds delay.
 *
 **/
@Component({
   selector: 'app-message',
   templateUrl: 'message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy {
    messages: Message[] = [];
    messageTypes = MessageTypes;
    private _success = new Subject<string>();
    messageClosed = false;
    private timmer: any;

   subscription: Subscription;
   constructor(private messageService: MessageService, private translateService: TranslateService) { }
   ngOnInit() {
      this.subscription = this.messageService.getMessages().subscribe(msgs => {
            this.messages = msgs;
            if (this.messages) {
                // Try to tranlsate message with current specified language if the message code in language json files.
                this.messages.forEach( msg => {
                    msg.message = this.translateService.instant(msg.message);
                });
            }
            // Work for auto hidding messages after 20 seconds delay.
            this.messageClosed = false;
            if (this.timmer) {
               clearTimeout(this.timmer);
            }
            this.timmer = setTimeout(() => this.messageClosed = true, 20000);
        });
   }

   ngOnDestroy() {
     // unsubscribe to ensure no memory leaks
     this.subscription.unsubscribe();
   }
}
