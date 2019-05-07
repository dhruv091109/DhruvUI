import { User } from '../../../models/system/user';
import { UserService } from '../../../services/system/user.service';
import { MessageService } from '../../../services/system/message.service';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { formFieldValidationIntegrate} from '../../../services/system/form.field.validation.integrate.service';
import { NgForm} from '@angular/forms';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
    model: any = {}; // user model binding data in register UI.
    loading = false;
    @ViewChild('f') registerForm: NgForm;

    constructor(private router: Router,
        private userService: UserService,
        private messageService: MessageService) { }

    register() {
        this.loading = true;
        this.userService.register(this.model as User)
        .subscribe(
            data => {
                this.loading = false;
                this.registerForm.reset();
                this.messageService.success('Registration Successful');
                this.messageService.emitMessages(true);
                this.router.navigate(['login']); // After register user successed, go to user login page.
                },
            error => {
                // Shared function to collect server side business model validation errors and assign the errors to associated form fields.
                formFieldValidationIntegrate(this.registerForm, error);
                this.loading = false;
            }
        );
    }

    onCancelClick(e) {
        e.preventDefault();

    }
}
