// Interfaces
import { ILogger } from "../interfaces/ILogger";

import { LoggingLevel } from "./CommonEnums";

export default class Settings
{
   private MAX_CACHE_SIZE: number;

   private loggingEnabled_: boolean;
   private loggingLevel_: LoggingLevel;
   private logger: ILogger;

   public constructor(logger: ILogger, args)
   {
      // defaults
      this.MAX_CACHE_SIZE = 13;

      this.loggingEnabled_ = (typeof args.loggingEnabled !== "undefined") ? args.loggingEnabled : false;
      const logLevel: string = (typeof args.loggingLevel !== "undefined") ? args.loggingLevel : "WARN";
      this.setLoggingLevel(logLevel);

      this.logger = logger;

      let key: any;
      // tslint:disable-next-line forin
      for (key in args) {
         switch (key) {
            case "MAX_CACHE_SIZE":
               this.MAX_CACHE_SIZE = args.MAX_CACHE_SIZE;
               break;
            // intentional fall through
            case "loggingEnabled":
            case "loggingLevel":
               break;
            default:
               this.logger.warn("Parameter " + key + " does not exist.");
         }
      }
   }

   public get loggingEnabled() {
      return this.loggingEnabled_;
   }

   public get loggingLevel() {
      return this.loggingLevel_;
   }

   private setLoggingLevel(level: string): void
   {
      const upperLevel = level.toUpperCase();
      switch (upperLevel) {
         case "ERROR":
            this.loggingLevel_ = LoggingLevel.ERROR;
            break;
         case "WARN":
            this.loggingLevel_ = LoggingLevel.WARN;
            break;
         case "INFO":
            this.loggingLevel_ = LoggingLevel.INFO;
            break;
         case "DEBUG":
            this.loggingLevel_ = LoggingLevel.DEBUG;
            break;
         default:
            this.loggingLevel_ = LoggingLevel.WARN;
      }
   }
}
