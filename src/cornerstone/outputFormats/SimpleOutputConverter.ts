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
   public convertVerse(options: IChapterOptions, data: IBibleContent): IVerse
   {
      return data.verses[0].text;
   }

   public convertChapter(options: IVerseOptions, data: IBibleContent): IChapter
   {
      const output = [];
      for (const verse of data.verses) {
         output.push(verse);
      }
      return output;
   }
}
