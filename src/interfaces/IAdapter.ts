import { Book } from "../cornerstone/CommonEnums";
import IUrlOptions from "./IUrlOptions";

export default interface IAdapter
{
   getVerse(options: IVerseParams): Promise<any>;
   getChapter(options: IChapterParams): Promise<any>;
   /*getNextChapter(): object;
   getPrevChapter(): object;
   getCatalog(): object;

   getLanguages(): object;
   getVersions(): object;

   getAdapterName(): string;
   getCapabilities(): string[];*/

}

export interface IAdapterOptions
{
   adapterName: string;
   /**
    * Maximum number of queries.
    * Valid values:
    *    1 or greater
    */
   maxNumberOfQueries?: number;
   /**
    * Time period (in seconds) for the maximum number of queries.
    * If maxNumberOfQueries is not set, this value is ignored.
    * If maxNumberOfQueries is set, this value is required.
    */
   queryPeriod?: number;
   /**
    * Maximum number of queries that can be stored in the cache.
    */
   maxVersesInCache?: number;
   /**
    * API terms URL. Useful for the developer to determine if their
    * application meets the terms.
    */
   termsUrl: string;
   /**
    * Text format of the verses. HTML, paragraph containing newlines,
    * or plain text.
    */
   textFormat: ITextFormat;
}

export interface IVerseParams extends IChapterParams
{
   verse: number;
}

export interface IVerseDetails extends IChapterDetails
{
   verse: number;
}

export interface IChapterParams
{
   chapter: number;
   book: Book;
}

export interface IChapterDetails
{
   chapter: number;
   book: string;
}

export type ITextFormat = "plain" | "para" | "html";

export enum ETextFormat
{
   PLAIN,
   PARA,
   HTML
}

export interface IVerse
{
   verseNumber: number;
   text: string;
}

export interface IBibleContent
{
   bookName: string;
   ltr: boolean;
   verses: IVerse[];
}
