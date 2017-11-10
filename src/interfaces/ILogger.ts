/**
 * Logger interface. Each method logs a different type of message.
 */
export default interface ILogger
{
   debug(msg: string): void;
   info(msg: string): void;
   warn(msg: string): void;
   error(msg: string): void;
   logAndGiveError(msg: string): Error;
}
