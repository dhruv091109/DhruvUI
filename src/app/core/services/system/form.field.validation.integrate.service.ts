import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Shared function to collect server side business model validation errors and assign the errors to associated form fields.
 * @param form any form defined as #f="ngForm"
 * @param error http error response. Returned from server side. it contains server side business model validation errors.
 */
export function formFieldValidationIntegrate(form: any, error: any) {
    if (form && error) {
        if (error instanceof HttpErrorResponse && error.status === 400) {
            // handle validation error
            console.log('Error: ' + JSON.stringify(error.error));
            const validationErrorDictionary = error.error;
            for (var fieldName in validationErrorDictionary) {
                if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                    if (form.controls[fieldName]) {
                        const msg = validationErrorDictionary[fieldName];
                        // console.log('msg: ' + JSON.stringify(msg));

                        // integrate into angular's form validation if we have field validation
                        form.controls[fieldName].setErrors({ invalid: true, message: msg.join('<br/>') });
                    }
                }
            }
        }
   }
}


