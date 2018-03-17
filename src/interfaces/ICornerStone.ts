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
}

export interface ICornerStoneSettings
{
   /**
    * Size of cache for storing web requests.
    */
   cacheSize?: number;
   /**
    * Define API keys for adapters that require them. Defining the key
    * automatically enables the adapter.
    */
   setAdapterKeys?: IAdapterInfo[]; // [{name: "DBP", key: "apikey"}, ...]
   /**
    * Output format of calls to CornerStone. Select a preset to define
    * how to parse the returned data.
    */
   outputFormat?: OutputFormatType;
   /**
    * Define the newline character(s) for verses.
    * Note: Only applicable if the verse format is not plain text.
    */
   newlineCharacter?: string;
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

//--------------------------------------------------------
// Verse Options
//--------------------------------------------------------
export interface IVerseOptions
{
   verse: number;
   chapter: number;
   book: BookId;
   // version?: string;
   // language?: string;
}

//--------------------------------------------------------
// Verse Return Types
//--------------------------------------------------------
export type IVerse = IStandardVerse | ISimpleVerse;

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

/**
 * Simple output
 */
export type ISimpleVerse = string;
type ISimpleVerses = string[];
export type ISimpleContent = ISimpleVerses;

/*
export interface IChapterOptions
{
   chapter: number;
   bookId: string;
   version?: string;
   language?: string;
}
*/

type SuccessCallback = (data: object) => any;
type ErrorCallback = (error: Error) => any;

type BookId = string;

/**
 * Books of the Bible.
 * Abbreviations obtained from https://crosswire.org/wiki/OSIS_Book_Abbreviations
 */
export const validBookIds = [
      ["Gen", "Genisis"],
      ["Exod", "Exodus"],
      ["Lev", "Leviticus"],
      ["Num", "Numbers"],
      ["Deut", "Deuteronomy"],
      ["Josh", "Joshua"],
      ["Judg", "Judges"],
      ["Ruth"],
      ["1Sam", "1 Samuel"],
      ["2Sam", "2 Samuel"],
      ["1Kgs", "1 Kings"],
      ["2Kgs", "2 Kings"],
      ["1Chr", "1 Chronicles"],
      ["2Chr", "2 Chronicles"],
      ["Ezra"],
      ["Neh", "Nehemiah"],
      ["Esth", "Esther"],
      ["Job"],
      ["Ps", "Psalms"],
      ["Prov", "Proverbs"],
      ["Eccl", "Ecclesiastes"],
      ["Song", "Song of Solomon"],
      ["Isa", "Isaiah"],
      ["Jer", "Jeremiah"],
      ["Lam", "Lamentations"],
      ["Ezek", "Ezekiel"],
      ["Dan", "Daniel"],
      ["Hos", "Hosea"],
      ["Joel"],
      ["Amos"],
      ["Obad", "Obadiah"],
      ["Jonah"],
      ["Mic", "Micah"],
      ["Nah", "Nahum"],
      ["Hab", "Habakkuk"],
      ["Zeph", "Zephaniah"],
      ["Hag", "Haggai"],
      ["Zech", "Zechariah"],
      ["Mal", "Malachi"],
      ["Matt", "Matthew"],
      ["Mark"],
      ["Luke"],
      ["John"],
      ["Acts"],
      ["Rom", "Romans"],
      ["1Cor", "1 Corinthians"],
      ["2Cor", "2 Corinthians"],
      ["Gal", "Galatians"],
      ["Eph", "Ephesians"],
      ["Phil", "Philippians"],
      ["Col", "Colossians"],
      ["1Thess", "1 Thessalonians"],
      ["2Thess", "2 Thessalonians"],
      ["1Tim", "1 Timothy"],
      ["2Tim", "2 Timothy"],
      ["Titus"],
      ["Phlm", "Philemon"],
      ["Heb", "Hebrews"],
      ["Jas", "James"],
      ["1Pet", "1 Peter"],
      ["2Pet", "2 Peter"],
      ["1John", "1 John"],
      ["2John", "2 John"],
      ["3John", "3 John"],
      ["Jude"],
      ["Rev", "Revelation"]];

/**
 * ISO 639-3 Language Abbreviations.
 */
export type Language =
      "eng"; // English
