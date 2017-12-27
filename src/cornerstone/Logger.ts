// interfaces
import ILogger from "../interfaces/ILogger";

// internal
import { LoggingLevel } from "./CommonEnums";

/**
 * Provides logging capabilities.
 *
 * Logs based on the set logging level. Logging levels range from
 * the most detailed (DEBUG) to the least detailed (ERROR).
 * Possible values: DEBUG, INFO, WARN, ERROR.
 * The logger will log messages based on the provided level and
 * any logs of lesser detail. For example, setting logging to
 * INFO will enable logging for INFO, WARN, and ERROR messages.
 * Note: this setting only works if logging is enabled.
 */
export default class Logger implements ILogger
{
   // initially set all log functions to do nothing
   public debug = this.nop;
   public info = this.nop;
   public warn = this.nop;
   public error = this.nop;

   private loggingEnabled: boolean;
   private level: LoggingLevel;

   public constructor(
         // defaults
         {loggingEnabled = false,
          loggingLevel = LoggingLevel.WARN}
         // types
       : {loggingEnabled?: boolean,
          loggingLevel?: LoggingLevel}) {
      this.loggingEnabled = loggingEnabled;
      this.level = loggingLevel;

      // setup log functions
      this.setupLogging();
   }

   /**
    * Log the error and return an instance of an Error.
    */
   public logAndGiveError(msg: string): Error
   {
      this.error(msg);
      return new Error(msg);
   }

   /**
    * Used to make logging do nothing (when disabled) to improve efficiency.
    */
   // tslint:disable-next-line no-empty
   private nop(msg: string): void {}

   /**
    * Configures all of the logging based on the level.
    */
   private setupLogging(): void
   {
      if (this.loggingEnabled) {
         switch (this.level) {
            // intentional fall-throughs
            case LoggingLevel.DEBUG:
               this.debug = (msg: string): void => {
                  // tslint:disable-next-line no-console
                  console.log(this.prepareMsg(msg));
               };
            case LoggingLevel.INFO:
               this.info = (msg: string): void => {
                  // tslint:disable-next-line no-console
                  console.info(this.prepareMsg(msg));
               };
            case LoggingLevel.WARN:
               this.warn = (msg: string): void => {
                  // tslint:disable-next-line no-console
                  console.warn(this.prepareMsg(msg));
               };
            case LoggingLevel.ERROR:
               this.error = (msg: string): void => {
                  // tslint:disable-next-line no-console
                  console.error(this.prepareMsg(msg));
               };
         }
      }
   }

   /**
    * Prepares the message to be logged by adding information
    * that might be useful.
    */
   private prepareMsg(msg: string): string
   {
      let callerInfo: string = "";
      return this.getTime() + callerInfo + ": " + msg;
   }

   private getMonth(monthNum: number): string
   {
      const months = ["Jan", "Feb", "Mar", "Apr",
                      "May", "June", "July", "Aug",
                      "Sept", "Oct", "Nov", "Dec"];
      if (monthNum >= 0 && monthNum < 12) {
         return months[monthNum];
      } else {
         this.warn("[Logger]: getMonth: Received an invalid month index.");
         return "";
      }
   }

   /**
    * Get a timestamp.
    */
   private getTime(): string
   {
      const now = new Date();
      return this.getMonth(now.getMonth()) + " " + now.getDate() +
             " at " + now.getHours() +
             ":" + ("0" + now.getMinutes()).slice(-2) +
             ":" + ("0" + now.getSeconds()).slice(-2) +
             "." + (now.getMilliseconds() / 1000).toFixed(3).slice(-3);
   }
}
