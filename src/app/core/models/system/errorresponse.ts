/**
 * Custom message entity. Work for error log logging.
 * It has public property such as status, statusText, details.
 * Note: properties called "status", "statusText", "details" corporate with HttpErrorResponse.status,
 * HttpErrorResponse.statusText, HttpErrorResponse.message.
 * '@angular/common/http' HttpErrorResponse.
 */
export class ErrorResponse {
    /** properties called "status", "statusText", "details" corporate with HttpErrorResponse.status,
     * HttpErrorResponse.statusText, HttpErrorResponse.message.
     * */
    constructor(public status: any, public statusText: any, public details: any) { }
}
