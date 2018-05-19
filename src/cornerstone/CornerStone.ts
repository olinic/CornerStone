// External dependencies.
import { Promise } from "es6-promise";

// Internal dependencies.
import { IBibleContent } from "../interfaces/IAdapter";
import IAdapterManager from "../interfaces/IAdapterManager";
import ICornerStone, {
   bookIds,
   IChapter,
   IChapterOptions,
   IVerse,
   IVerseOptions,
   OutputFormatType,
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
   private language: string;
   /**
    * Current version
    */
   private version: string;
   /**
    * Book IDs
    */
   private bookIds: string[];

   public constructor(
      private logger: ILogger,
      private adapterManager: IAdapterManager,
      private validator: IValidator,
      private outputType: OutputFormatType)
   {
      this.language = "eng";
      this.version = "kjv";
      this.bookIds = bookIds;
   }

   public getChapter(options: IChapterOptions): Promise<IChapter>
   {
      if (this.validator
            .reset()
            .string({name: "object.book", value: options.book})
            .number({name: "object.chapter", value: options.chapter})
            .isValid()) {
         return new Promise((resolve, reject) => {
            this.adapterManager.getChapter({
               book: this.convertToBook(options.book),
               chapter: options.chapter
            }).then((data) => {
               resolve(this.convertToChapter(options, data));
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

   public getVerse(options: IVerseOptions): Promise<IVerse>
   {
      if (this.validator
            .reset()
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

   public setBookIds(newIds: string[]): void
   {
      this.validator.reset();
      const bookIds = this.getBookIds();
      // Validate user input
      if (newIds.length === bookIds.length)
      {
         for (const newId of newIds) {
            this.validator.string({ name: "Id", value: newId });
         }
         if (this.validator.isValid()) {
            this.bookIds = newIds;
         } else {
            this.logger.error(this.validator.getErrorMessage);
         }
      } else {
         this.logger.error("Length of new IDs (" + newIds.length +
               ") does not match current length of Book IDs (" +
               bookIds.length + ")");
      }
   }

   public getBookIds(): string[]
   {
      return bookIds;
   }

   private convertToBook(bookId: string): Book
   {
      let book: Book = this.getBookIds().indexOf(bookId);
      if (book === -1) {
         throw this.logger.logAndGiveError("Book ID " + bookId + " is not in the list of valid book IDs.");
      }
      return book;
   }

   private convertToChapter(options: IChapterOptions, content: IBibleContent): IChapter
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
            output = [];
            for (let verse of content.verses) {
               output.push(verse);
            }
            break;
         }
      }
      return output;
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
