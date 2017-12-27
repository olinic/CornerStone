// External dependencies.
import { Promise } from "es6-promise";

// Internal dependencies.
import ICornerStone, { IVerseOptions } from "../interfaces/ICornerStone";
import ILogger from "../interfaces/ILogger";

/**
 * Implements interface to the user (developer).
 */
export default class CornerStone implements ICornerStone
{
   private logger: ILogger;

   public constructor(logger: ILogger)
   {
      this.logger = logger;
   }

   public getVerse(options: IVerseOptions): Promise<any>
   {
      return new Promise(() => "hello");
   }
}
