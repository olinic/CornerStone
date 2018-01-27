// External dependencies.
import { Promise } from "es6-promise";

// Internal dependencies.
import IAdapterManager from "../interfaces/IAdapterManager";
import { IBibleContent } from "../interfaces/IAdapter";
import ICornerStone, {
   IStandardContent,
   ISimpleVerse,
   IVerseOptions,
   OutputFormatType,
   validBookIds
} from "../interfaces/ICornerStone";
import ILogger from "../interfaces/ILogger";
import { Book } from "./CommonEnums";

/**
 * Implements interface to the user (developer).
 */
export default class CornerStone implements ICornerStone
{
   /**
    * Current language
    */
   private language;
   /**
    * Current version
    */
   private version;

   public constructor(
      private logger: ILogger,
      private adapterManager: IAdapterManager,
      private outputType: OutputFormatType)
   {
      this.language = "eng";
      this.version = "kjv";
   }

   public getVerse(options: IVerseOptions): Promise<any>
   {
      return new Promise((resolve, reject) => {
         this.adapterManager.getVerse({
            book: this.convertToBook(options.bookId),
            chapter: options.chapter,
            verse: options.verse
         }).then((data) => {
            resolve(this.convertToVerse(options, data));
         }).catch((err) => {
            reject(err);
         });
      });
   }

   private convertToBook(bookId: string): Book
   {
      let bookIndex;
      let bookFound = false;
      for (bookIndex = 0; bookIndex < validBookIds.length && !bookFound; bookIndex++) {
         bookFound = (validBookIds[bookIndex].indexOf(bookId) !== -1);
      }
      return bookIndex;
   }

   private convertToVerse(options: IVerseOptions, content: IBibleContent): IStandardContent | ISimpleVerse
   {
      let output: any;
      switch(this.outputType)
      {
         case "standard":
         {
            output = {
               language: this.language,
               version: this.version,
               bookId: options.bookId,
               bookName: content.bookName,
               chapter: options.chapter,
               ltr: true,
               verses: content.verses
            }
            break;
         }
         case "simple":
         {
            output = content.verses[0];
            break;
         }
      }
      return output;
   }
}
