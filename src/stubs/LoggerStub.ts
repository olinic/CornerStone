// interfaces
import ILogger from "../interfaces/ILogger";

export default class LoggerStub implements ILogger
{
   public debug = this.nop;
   public info = this.nop;
   public warn = this.nop;
   public error = this.nop;
   /**
    * Log the error and return an instance of an Error.
    */
   public logAndGiveError(msg: string): Error
   {
      return new Error(msg);
   }

   // tslint:disable-next-line no-empty
   private nop(msg: string): void {}
}
