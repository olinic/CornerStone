/**
 * Logger interface. Each method logs a different type of message.
 */
export interface ILogger
{
   debug(...args: any[]): void;
   info(...args: any[]): void;
   warn(...args: any[]): void;
   error(...args: any[]): void;
   logAndGiveError(...args: any[]): Error;
}
