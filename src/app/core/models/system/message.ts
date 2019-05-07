import { MessageTypes } from '../../../_enumerations/messagetypes';
/**
 * Entity contains message details content and definitions.
 * Work for snackbar message box and conversation popup dialog box.
 * Note: property called "messageKey" corporates with server side busienss model validation
 * and auto searching and hight light assocaited input field in UI. (Optional)
 */
export class Message {
  constructor(public message: string, public type: MessageTypes, public messageKey = '') { }
}
