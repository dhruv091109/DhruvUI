import { APP_PATHS } from '../../../../_configs/routepaths';
import { SecurityService } from '../../../services/system/security.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService} from '../../../services/system/message.service';
import { NgForm} from '@angular/forms';
import { formFieldValidationIntegrate} from '../../../services/system/form.field.validation.integrate.service';

@Component({
    // moduleId: module.id,
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    @ViewChild('f') loginForm: NgForm;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: SecurityService,
        private messageService: MessageService) { }
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    /**
    * Call web api with login user name and password. Server side check if the user name and password is existing or not.
    */
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.loginForm.reset();
                    if (this.returnUrl.indexOf(APP_PATHS.login) > -1) {
                       this.router.navigate(['']); // Redirect to home page.
                    } else {
                       this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    // Shared function to collect server side business model validation errors and assign the errors to associated form fields.
                     formFieldValidationIntegrate(this.loginForm, error);
                    this.loading = false;
                });
    }
    /** Redirect to register page. Work for new user registration. */
    onRegisterClick(e) {
        e.preventDefault();
        this.router.navigate([APP_PATHS.register]);
    }
}
