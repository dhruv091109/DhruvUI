import {Component} from '@angular/core';
import { MessageTypes } from '../../_enumerations/messagetypes';
import { MessageService } from '../../core/services/system/message.service';
import { SecurityService } from '../../core/services/system/security.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-demo-timezone',
   templateUrl: './timezonetest.component.html'
 })
export class TimeZoneTestComponent {
    model: any = {}; // user model binding data in UI.
    title = 'Time Zone Demo';
    constructor(private securityService: SecurityService) {}
    submit() {
    }
}
