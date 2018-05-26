/**
 * CornerStone interface/API.
 *
 * By default, CornerStone returns a Promise for all
 * asynchronous calls.
 * For more information on promises, go to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
 */
export default interface ICornerStone
{
   /**
    * Retrieve a Bible verse.
    *
    * Example:
    * CornerStone.getVerse({
    *    book: "John",
    *    chapter: 3,
    *    verse: 18
    * })
    * .then(function(verse) {
    *    // do something
    * })
    * .catch(function(err) {
    *    // something went wrong
    * });
    */
   getVerse(options: IVerseOptions): Promise<IVerse>;
   getChapter(options: IChapterOptions): Promise<IChapter>;
   getLanguages(): Promise<ILanguages>;
}

export interface ICornerStoneSettings
{
   /**
    * Number of web requests to cache.
    */
   cacheSize?: number;
   /**
    * Book IDs to use to reference books.
    */
   bookIds?: string[];
   /**
    * Enable logging.
    */
   logging?: boolean;
   /**
    * Logging level. Case Insensitive. (error, warn, debug, or info)
    */
   loggingLevel?: string;
   /**
    * Define the newline character(s) for verses.
    * Note: Only applicable if the verse format is not plain text.
    */
   newlineCharacter?: string;
   /**
    * Output format of calls to CornerStone. Select a preset to define
    * how to parse the returned data.
    */
   outputFormat?: OutputFormatType;
   /**
    * Define API keys for adapters that require them. Defining the key
    * automatically enables the adapter.
    */
   setAdapterKeys?: IAdapterInfo[]; // [{name: "DBP", key: "apikey"}, ...]
   /**
    * Allow adapters to provide data in their native format, or
    * force all verses to be plain text.
    */
   verseFormat?: VerseFormat;
}

export type OutputFormatType = "standard" | "simple";
type VerseFormat = "raw" | "plain";

interface IAdapterInfo
{
   name: string;
   key: string;
}

// --------------------------------------------------------
// Options
// --------------------------------------------------------
export interface IChapterOptions
{
   chapter: number;
   book: string;
   //version?: string;
   //language?: string;
}

export interface IVerseOptions extends IChapterOptions
{
   verse: number;
}

// --------------------------------------------------------
// Return Types
// --------------------------------------------------------
export type IChapter = IStandardContent | ISimpleVerses;
export type IVerse = IStandardContent | ISimpleVerse;
export type ILanguages = ILanguage[];

/**
 * Standard output
 */
export interface IStandardVerse
{
   text: string;
   verseNumber: number;
}

export interface IStandardContent
{
   language: string;
   version: string;
   bookId: BookId;
   bookName: string;
   chapter: number;
   ltr: boolean;
   verses: IStandardVerse[];
}

export interface ILanguage
{
   code: string;
   nativeName: string;
   englishName: string;
}

/**
 * Simple output
 */
export type ISimpleVerse = string;
export type ISimpleVerses = string[];

type SuccessCallback = (data: object) => any;
type ErrorCallback = (error: Error) => any;

type BookId = string;

/**
 * Catalog
 */
type ICatalogChapter = number[]; // array of number of verses
interface ICatalogBook
{
   bookId: string;
   chapters: ICatalogChapter[]; // array of chapters
}
export type ICatalog = ICatalogBook[]; // array of books

/**
 * Books of the Bible.
 * Abbreviations obtained from http://wiki.crosswire.org/OSIS_Book_Abbreviations
 */
export let bookIds = [
      "Gen", "Exod", "Lev",
      "Num", "Deut", "Josh",
      "Judg", "Ruth", "1Sam",
      "2Sam", "1Kgs", "2Kgs",
      "1Chr", "2Chr", "Ezra",
      "Neh", "Esth", "Job",
      "Ps", "Prov", "Eccl",
      "Song", "Isa", "Jer",
      "Lam", "Ezek", "Dan",
      "Hos", "Joel", "Amos",
      "Obad", "Jonah", "Mic",
      "Nah", "Hab", "Zeph",
      "Hag", "Zech", "Mal",
      "Matt", "Mark", "Luke",
      "John", "Acts", "Rom",
      "1Cor", "2Cor", "Gal",
      "Eph", "Phil", "Col",
      "1Thess", "2Thess", "1Tim",
      "2Tim", "Titus", "Phlm",
      "Heb", "Jas", "1Pet",
      "2Pet", "1John", "2John",
      "3John", "Jude", "Rev"
   ];

/**
 * ISO 639-1 Language Abbreviations.
 */
export type Language = string;
