// External dependencies.
import { Promise } from "es6-promise";

// Internal dependencies.
import IAdapterManager from "../interfaces/IAdapterManager";
import ICornerStone, { IVerseOptions } from "../interfaces/ICornerStone";
import ILogger from "../interfaces/ILogger";
import { Book } from "./CommonEnums";

/**
 * Implements interface to the user (developer).
 */
export default class CornerStone implements ICornerStone
{
   public constructor(
      private logger: ILogger,
      private adapterManager: IAdapterManager)
   {}

   public getVerse(options: IVerseOptions): Promise<any>
   {
      // return new Promise((resolve, reject) => resolve("hello"));
      return this.adapterManager.getVerse({
         book: this.convertToBook(options.bookId),
         chapter: options.chapter,
         verse: options.verse
      });
   }

   private convertToBook(bookId: string): Book
   {
      return Book.GEN;
   }
}
