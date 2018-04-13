// External dependencies.
import { Promise } from "es6-promise";

// Internal dependencies.
import { IBibleContent } from "../interfaces/IAdapter";
import IAdapterManager from "../interfaces/IAdapterManager";
import ICornerStone, {
   IVerse,
   IVerseOptions,
   OutputFormatType,
   validBookIds
} from "../interfaces/ICornerStone";
import ILogger from "../interfaces/ILogger";
import IValidator from "../interfaces/IValidator";
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
      private validator: IValidator,
      private outputType: OutputFormatType)
   {
      this.language = "eng";
      this.version = "kjv";
   }

   public getVerse(options: IVerseOptions): Promise<IVerse>
   {
      if (this.validator
            .string({name: "object.book", value: options.book})
            .number({name: "object.chapter", value: options.chapter})
            .number({name: "object.verse", value: options.verse})
            .isValid()) {
         return new Promise((resolve, reject) => {
            this.adapterManager.getVerse({
               book: this.convertToBook(options.book),
               chapter: options.chapter,
               verse: options.verse
            }).then((data) => {
               resolve(this.convertToVerse(options, data));
            }).catch((err) => {
               reject(err);
            });
         });
      } else {
         return new Promise((resolve, reject) => {
            const error = this.validator.getErrorMessage();
            this.logger.error(error);
            reject(error);
         });
      }
   }

   public getValidBooks(): String[][]
   {
      return validBookIds;
   }

   private convertToBook(bookId: string): Book
   {
      const validBooks = this.getValidBooks();
      let bookIndex = 0;
      while (bookIndex < validBooks.length && (validBooks[bookIndex].indexOf(bookId) === -1)) {
         bookIndex++;
      }
      // Never found the book.
      if (bookIndex === validBooks.length) {
         bookIndex = -1;
      }
      return bookIndex;
   }

   private convertToVerse(options: IVerseOptions, content: IBibleContent): IVerse
   {
      let output: any;
      switch (this.outputType)
      {
         case "standard":
         {
            output = {
               language: this.language,
               version: this.version,
               bookId: options.book,
               bookName: content.bookName,
               chapter: options.chapter,
               ltr: true,
               verses: content.verses
            };
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
