import { IBibleContent } from "./IAdapter";
import {
   IChapter,
   IChapterOptions,
   IVerse,
   IVerseOptions
} from "./ICornerStone";

/**
 * Interface for Output objects that convert Bible content into another format.
 */
export interface IOutputConverter
{
   convertVerse(options: IVerseOptions, data: IBibleContent): IVerse;
   convertChapter(options: IChapterOptions, data: IBibleContent): IChapter;
}
