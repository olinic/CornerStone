import {
   IAdapter,
   IAdapterOptions,
   IBibleContent,
   IChapterDetails,
   IVerseDetails
} from "./IAdapter";
import {
   ILanguageCode,
   IVersions,
} from "./ICornerStone";
import { IUrlOptions } from "./IUrlOptions";

export interface IOnlineAdapterOptions extends IAdapterOptions
{
   /**
    * Adapter books. Useful for the howToGet... to utilize correct
    * book names for that adapter.
    */
   books: string[];
   /**
    * URL to check if adapter is available. Ideally, this URL returns little
    * data.
    */
   howToCheckAvailability: IUrlOptions;
   /**
    * Determine the URL to get languages.
    */
   howToGetLanguages: ILanguageAction;
   /**
    * Define how to process/interpret the language data.
    */
   howToInterpretLanguages: IPostLanguageAction;
   /**
    * Determine the URL to get versions.
    */
   howToGetVersions: IVersionAction;
   /**
    * Determine how to process/interpret the version data.
    */
   howToInterpretVersions: IPostVersionAction;
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

export type ILanguageAction = () => IUrlOptions;
export type IPostLanguageAction = (data: string) => string[];
export type IVersionAction = (options: ILanguageCode) => IUrlOptions;
export type IPostVersionAction = (data: string) => IVersions;
export type IVerseAction = (options: IVerseDetails) => IUrlOptions;
export type IPostVerseAction = (data: string) => IBibleContent;
export type IChapterAction = (options: IChapterDetails) => IUrlOptions;
export type IPostChapterAction = (data: string) => IBibleContent;
