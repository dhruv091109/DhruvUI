import { Message } from '../../models/system/message';
import { MessageTypes } from '../../../_enumerations/messagetypes';
import { ModalTypes } from '../../../_enumerations/modaltypes';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
* The alert service enables any component in the application to display alert messages at the top of the page via the alert component.
* It has methods for displaying success and error messages, and a getMessage() method that returns an Observable that is used by
* the alert component to subscribe to notifications for whenever a message should be displayed.
* Reference: https://www.pointblankdevelopment.com.au/blog/113/aspnet-core-20-angular-24-user-registration-and-login-tutorial-example
* Corporate with app/directives/alert/alert.component.ts.
*
* Note: Services are singletons within the scope of an injector.
* Define the PlatformPickerService as provider in app module or root module and make it as singleton service.
* This will be application scoped singleton service.
*/
@Injectable()
export class MessageService {
  /** Subject is the container keeping customized messages. Note: subject here always contains system process feedback information.
   *
   * Subject() is doing both Emitting data and Subscribing it in another component.
   * So its the best way to compare with Emitting using Output.
   *
  */
  public messages: Subject<Message[]> = new Subject();
  private _messages: Message[] = [];
  /** Conversation is the containner keeping application's conversation messages for human being communication.
  * It is different with subject.
  * For example, at same time, application should have both subject and conversation throwing to UI.
  */
  public dialog: Subject<Message> = new Subject();
  /** Decide if keep the message after single location change. */
  private keepAfterNavigationChange = false;
  /** Decide if keep the conversation after single location change. */
  private keepDialogAfterNavigationChange = false;
  private messagesModalType = ModalTypes.Snackbar; // Default message box is material snackbar.
  private dialogModalType = ModalTypes.Dialog; // Default conversation is dialog box.
  constructor(private router: Router) {
      /**
      * Clear alert messages on route changed.
      */
      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterNavigationChange) {
               // Only keep for a single location change.
               this.keepAfterNavigationChange = false;
            } else {
               // Clear alert
               this.messages.next();
            }
         }
      });
  }

  /**
  * Add normal information message.
  * Note: This method only add one message into collection but the message still not published to UI.
  * Need to call method "emitMessages" at the end.
  * Note: Application supports publish more than one messags on UI.
  */
  info(message: string) {
    if (message && message.length > 0) {
       this._messages.push(new Message(message, MessageTypes.Info));
    }
  }
  /**
  * Add success message.
  * Note: This method only add one message into collection but the message still not published to UI.
  * Need to call method "emitMessages" at the end.
  * Note: Application supports publish more than one messags on UI.
  */
  success(message: string) {
    if (message && message.length > 0) {
       this._messages.push(new Message(message, MessageTypes.Success));
    }
  }
  /**
  * Add error message.
  * Note: This method only add one message into collection but the message still not published to UI.
  * Need to call method "emitMessages" at the end.
  * Note: Application supports publish more than one messags on UI.
  */
  error(message: string) {
    if (message && message.length > 0 ) {
      this._messages.push(new Message(message, MessageTypes.Error));
    }
  }

  /**
   * Adding error messages with message key. Corporate with server side business model validations messages.
   * messagekey is fieldName of server side business model.
   * Note: Corporate with directive called "InputValidationDirective" in "shared/direcives/input.validation.directive".
   *
  */
  validation(message: string, messagekey: string) {
    if (message && message.length > 0 ) {
      this._messages.push(new Message(message, MessageTypes.Validation, messagekey));
    }
  }
  /**
  * Add warning message.
  * Note: This method only add one message into collection but the message still not published to UI.
  * Need to call method "emitMessages" at the end.
  * Note: Application supports publish more than one messags on UI.
  */
  warning(message: string) {
    if (message && message.length > 0 ) {
      this._messages.push(new Message(message, MessageTypes.Warning));
    }
  }
 /**
  * Publish messages collection to UI message boxes and clean up the messages collection after published.
  * Default Modal Type = "Snackbar".
 */
  emitMessages(keepAfterNavigationChange = false, modalType = ModalTypes.Snackbar) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.messagesModalType = modalType;
    if ( this._messages.length > 0) {
      this.messages.next(this._messages);
      //
      // Clean up messages collection after messages have been emit to message box in UI.
      //
      this._messages = [];
    }
  }

  /**
  * Publish interactive or validation messages to UI.
  * Note: Application supports publish more than one messags on UI.
  *
  */
  getMessages(): Observable<Message[]> {
    return this.messages.asObservable();
  }
  /**
  * Return current defined rendering UI Modal type.
  * Work for rendering messagebox.
  */
  getMessageModalType(): ModalTypes {
    return this.messagesModalType;
  }

  /**
   *  Conversaction default is display as popup dialog box. Default alertType for conversation is Info.
   *  Note: After call addDialog method, message will be emitted to UI immediately.
  */
  addDialog(content: string, messageType = MessageTypes.Info, keepAfterNavigationChange = false, modalType = ModalTypes.Dialog) {
    this.keepDialogAfterNavigationChange = keepAfterNavigationChange;
    this.dialog.next(new Message(content, messageType));
    this.dialogModalType = modalType;
  }

  /**
  * Publish dialog message to UI dialog box.
  */
  getDialog(): Observable<Message> {
    return this.dialog.asObservable();
  }

  getDialogModalType(): ModalTypes {
    return this.dialogModalType;
  }
}
