import {Component} from '@angular/core';
import { MessageTypes } from '../../_enumerations/messagetypes';
import { MessageService } from '../../core/services/system/message.service';
import { SecurityService } from '../../core/services/system/security.service';

@Component({
   selector: 'app-demo2',
   templateUrl: './demo2.component.html'
 })
export class Demo2Component {
    constructor(private alertService: MessageService, private authenticationService: SecurityService) {}
    title = 'Demo2';
}
