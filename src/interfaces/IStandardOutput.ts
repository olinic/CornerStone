/**
 * Interface for defining formatting of standard output of content.
 */

type BookId = string;

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
