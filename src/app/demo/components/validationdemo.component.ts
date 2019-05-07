import {Component} from '@angular/core';
import { MessageTypes } from '../../_enumerations/messagetypes';
import { MessageService } from '../../core/services/system/message.service';
import { SecurityService } from '../../core/services/system/security.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-demo-validation',
   templateUrl: './validationdemo.component.html'
 })
export class ValidationDemoComponent {
    model: any = {}; // user model binding data in UI.
    title = 'Validation Demo';

    submit() {

    }

    onCancelClick(e) {
      e.preventDefault();
    }
}
