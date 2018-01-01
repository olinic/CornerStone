import { Book } from "../cornerstone/CommonEnums";
import IUrlOptions from "./IUrlOptions";

export default interface IAdapter
{
   getVerse(options: IVerseParams): Promise<any>;
   /*getChapter(options: IUrlOptions): Promise<any>;
   getNextChapter(): object;
   getPrevChapter(): object;
   getCatalog(): object;

   getLanguages(): object;
   getVersions(): object;

   getAdapterName(): string;
   getCapabilities(): string[];*/

}

export interface IVerseParams
{
   verse: number;
   chapter: number;
   book: Book;
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
   maxQueriesInCache?: number;
   /**
    * API terms URL.
    */
   termsUrl: string;
}
