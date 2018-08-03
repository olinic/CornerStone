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
 * Transforms Bible content into a simple and easy to use form.
 */
export class SimpleOuputConverter implements IOutputConverter
{
   public constructor(private logger: ILogger)
   {

   }

   public convertVerse(options: IChapterOptions, data: IBibleContent): IVerse
   {
      this.logger.debug("Converting verse output");
      return data.verses[0].text;
   }

   public convertChapter(options: IVerseOptions, data: IBibleContent): IChapter
   {
      this.logger.debug("Converting chapter output");
      const output = [];
      for (const verse of data.verses) {
         output.push(verse);
      }
      return output;
   }
}
