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
   getVerse(options: IVerseOptions): Promise<any>;
}

export interface ICornerStoneSettings
{
   cacheSize?: string;
   useAdapters?: IAdapterInfo[]; // [{name: "DBP", key: "apikey"}, {name: "DBN"}]

}

interface IAdapterInfo
{
   name: string;
   key?: string;
}

export interface IVerseOptions
{
   verse: number;
   chapter: number;
   bookId: Book;
   // version?: string;
   // language?: string;
}

export interface IVerse
{
   text: string;
   verseNumber: number;
   ltr: boolean;
}

type IVerses = IVerse[];

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

/**
 * Books of the Bible.
 * Abbreviations obtained from https://crosswire.org/wiki/OSIS_Book_Abbreviations
 */
type Book =
      "Gen" | "Genisis" |
      "Exod" | "Exodus" |
      "Lev" | "Leviticus" |
      "Num" | "Numbers" |
      "Deut" | "Deuteronomy" |
      "Josh" | "Joshua" |
      "Judg" | "Judges" |
      "Ruth" |
      "1Sam" | "1 Samuel" |
      "2Sam" | "2 Samuel" |
      "1Kgs" | "1 Kings" |
      "2Kgs" | "2 Kings" |
      "1Chr" | "1 Chronicles" |
      "2Chr" | "2 Chronicles" |
      "Ezra" |
      "Neh" | "Nehemiah" |
      "Esth" | "Esther" |
      "Job" |
      "Ps" | "Psalms" |
      "Prov" | "Proverbs" |
      "Eccl" | "Ecclesiastes" |
      "Song" | "Song of Solomon" |
      "Isa" | "Isaiah" |
      "Jer" | "Jeremiah" |
      "Lam" | "Lamentations" |
      "Ezek" | "Ezekiel" |
      "Dan" | "Daniel" |
      "Hos" | "Hosea" |
      "Joel" |
      "Amos" |
      "Obad" | "Obadiah" |
      "Jonah" |
      "Mic" | "Micah" |
      "Nah" | "Nahum" |
      "Hab" | "Habakkuk" |
      "Zeph" | "Zephaniah" |
      "Hag" | "Haggai" |
      "Zech" | "Zechariah" |
      "Mal" | "Malachi" |
      "Matt" | "Matthew" |
      "Mark" |
      "Luke" |
      "John" |
      "Acts" |
      "Rom" | "Romans" |
      "1Cor" | "1 Corinthians" |
      "2Cor" | "2 Corinthians" |
      "Gal" | "Galatians" |
      "Eph" | "Ephesians" |
      "Phil" | "Philippians" |
      "Col" | "Colossians" |
      "1Thess" | "1 Thessalonians" |
      "2Thess" | "2 Thessalonians" |
      "1Tim" | "1 Timothy" |
      "2Tim" | "2 Timothy" |
      "Titus" |
      "Phlm" | "Philemon" |
      "Heb" | "Hebrews" |
      "Jas" | "James" |
      "1Pet" | "1 Peter" |
      "2Pet" | "2 Peter" |
      "1John" | "1 John" |
      "2John" | "2 John" |
      "3John" | "3 John" |
      "Jude" |
      "Rev" | "Revelation";

/**
 * ISO 639-3 Language Abbreviations.
 */
export type Language =
      "eng"; // English
