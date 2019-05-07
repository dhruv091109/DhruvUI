/**
 * Corporate with error.handler.ts and logger.service.ts
 * Properties: path, message, stack, username, userid (Get logon user information if there is logon user.)
 * Corporate with "stacktrace.js"
 * Reference: https://www.stacktracejs.com/
 *
 */
export class Log {
  constructor(public userName: string, public userId: string, public path: string, public message: string, public stack: string) { }
}
