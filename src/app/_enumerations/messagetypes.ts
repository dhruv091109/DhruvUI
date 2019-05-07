
/**
 * Work for messagebox and define the message type.
 * Value "Info", "Success", "Warning", "Error", "Validation"
 */
export enum MessageTypes {
    /** Normal information. */
    Info = 'Info',
    /** Process is done successfully. */
    Success = 'Success',
    /** Warning message. */
    Warning = 'Warning',
    /** Error message. */
    Error = 'Error',
    /** Server side business model validation error. */
    Validation = 'Validation'
 }
