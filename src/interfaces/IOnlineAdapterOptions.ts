import IAdapter, {
   IAdapterOptions,
   IBibleContent,
   IChapterDetails,
   IVerseDetails
} from "./IAdapter";
import IUrlOptions from "./IUrlOptions";

export default interface IOnlineAdapterOptions extends IAdapterOptions
{
   /**
    * Adapter books. Useful for the howToGet... to utilize correct
    * book names for that adapter.
    */
   books: string[];
   /**
    * Determine the URL to get verse.
    */
   howToGetVerse: IVerseAction;
   /**
    * Define how to process/interpret the verse data.
    */
   howToInterpretVerse: IPostVerseAction;
   /**
    * Determine the URL to get chapter.
    */
   howToGetChapter: IChapterAction;
   /**
    * Define how to process/interpret the verse data.
    */
   howToInterpretChapter: IPostChapterAction;
}

export type IVerseAction = (options: IVerseDetails) => IUrlOptions;
export type IPostVerseAction = (data: string) => IBibleContent;
export type IChapterAction = (options: IChapterDetails) => IUrlOptions;
export type IPostChapterAction = (data: string) => IBibleContent;
