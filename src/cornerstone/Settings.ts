// Interfaces
import ILogger from "../interfaces/ILogger";

import { LoggingLevel } from "./CommonEnums";

export default class Settings
{
   private MAX_CACHE_SIZE: number;

   private logger: ILogger;

   public constructor(logger: ILogger, args)
   {
      // defaults
      this.MAX_CACHE_SIZE = 13;

      this.logger = logger;

      let key: any;
      // tslint:disable-next-line forin
      for (key in args) {
         switch (key) {
            case "MAX_CACHE_SIZE":
               this.MAX_CACHE_SIZE = args.MAX_CACHE_SIZE;
               break;
            // intentional fall through
            default:
               this.logger.warn("Parameter " + key + " does not exist.");
         }
      }
   }
}
