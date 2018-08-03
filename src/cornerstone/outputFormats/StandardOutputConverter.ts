import { IBibleContent } from "../../interfaces/IAdapter";
import {
   IChapter,
   IChapterOptions,
   IVerse,
   IVerseOptions
} from "../../interfaces/ICornerStone";
import { ILogger } from "../../interfaces/ILogger";
import { IOutputConverter } from "../../interfaces/IOutputConverter";

/**
 * Standard output converter.
 */
export class StandardOuputConverter implements IOutputConverter
{
   public constructor(private logger: ILogger)
   {

   }

   public convertVerse(options: IChapterOptions, data: IBibleContent): IVerse
   {
      this.logger.debug("Converting verse output");
      return {
         bookId: options.book,
         bookName: data.bookName,
         chapter: options.chapter,
         language: options.language, // TODO: Add spec to test that this is always set
         ltr: true,
         verses: data.verses,
         version: options.version // TODO: Add spec to test that this is always set
      };
   }

   public convertChapter(options: IVerseOptions, data: IBibleContent): IChapter
   {
      this.logger.debug("Converting chapter output");
      return {
         bookId: options.book,
         bookName: data.bookName,
         chapter: options.chapter,
         language: options.language, // TODO: Add spec to test that this is always set
         ltr: true,
         verses: data.verses,
         version: options.version // TODO: Add spec to test that this is always set
      };
   }
}
