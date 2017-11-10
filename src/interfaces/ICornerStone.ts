export default interface ICornerStone
{
   getVerse(options: object, callback?: (response: object) => void): Promise<any>;
}
/*
export interface IVerseOptions
{
   verse: number;
   chapter: number;
   bookId: string;
   version?: string;
   language?: string;
}

export interface IChapterOptions
{
   chapter: number;
   bookId: string;
   version?: string;
   language?: string;
}
*/
