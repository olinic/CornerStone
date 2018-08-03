// Internal dependencies.
import { IAdapter, IBibleContent } from "../interfaces/IAdapter";
import { IAdapterManager } from "../interfaces/IAdapterManager";
import {
   bookIds,
   IChapter,
   IChapterOptions,
   ICornerStone,
   ILanguages,
   IVerse,
   IVerseOptions,
} from "../interfaces/ICornerStone";
import { ILogger } from "../interfaces/ILogger";
import { IOutputConverter } from "../interfaces/IOutputConverter";
import { IValidator } from "../interfaces/IValidator";
import { Book } from "./CommonEnums";

/**
 * Implements interface to the user (developer).
 */
export class CornerStoneBible implements ICornerStone
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
      private converter: IOutputConverter)
   {
      this.language = "eng";
      this.version = "kjv";
      this.bookIds = bookIds;
   }

   public getChapter(options: IChapterOptions): Promise<IChapter>
   {
      return this.aPromise(
         options,
         this.validator
            .reset()
            .string({name: "object.book", value: options.book})
            .number({name: "object.chapter", value: options.chapter})
            .isValid(),
         this.adapter().getChapter({
            book: this.convertToBook(options.book),
            chapter: options.chapter
         }),
         this.converter.convertChapter
      );
   }

   public getVerse(options: IVerseOptions): Promise<IVerse>
   {
      return this.aPromise(
         options,
         this.validator
            .reset()
            .string({name: "object.book", value: options.book})
            .number({name: "object.chapter", value: options.chapter})
            .number({name: "object.verse", value: options.verse})
            .isValid(),
         this.adapter().getVerse({
            book: this.convertToBook(options.book),
            chapter: options.chapter,
            verse: options.verse
         }),
         this.converter.convertVerse
      );
   }

   public getLanguages(): Promise<ILanguages>
   {
      return new Promise((resolve, reject) => {
         resolve([]);
      });
   }

   public setBookIds(newIds: string[]): void
   {
      this.validator.reset();
      // Validate user input
      if (newIds.length === this.getBookIds.length)
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
               this.getBookIds.length + ")");
      }
   }

   public getBookIds(): string[]
   {
      return bookIds;
   }

   private adapter(): IAdapter
   {
      return this.adapterManager.getAdapter();
   }

   private aPromise(
         options: any,
         isValid: boolean,
         promise: Promise<IBibleContent>,
         postProcessing: (options: any, data: any) => any): Promise<any>
   {
      return new Promise((resolve, reject) => {
         if (isValid) {
            promise.then((data) => {
               resolve(postProcessing(options, data));
            }).catch((err) => {
               reject(err);
            });
         } else {
            const error = this.validator.getErrorMessage();
            this.logger.error(error);
            reject(error);
         }
      });
   }

   private convertToBook(bookId: string): Book
   {
      const book: Book = this.getBookIds().indexOf(bookId);
      if (book === -1) {
         throw this.logger.logAndGiveError("Book ID " + bookId + " is not in the list of valid book IDs.");
      }
      return book;
   }
}
