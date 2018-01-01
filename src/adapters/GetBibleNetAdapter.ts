// Internal dependencies.
import Adapter from "../cornerstone/Adapter";
import { IVerseParams } from "../interfaces/IAdapter";
import ILogger from "../interfaces/ILogger";
import IWebGetter from "../interfaces/IWebGetter";

/**
 * 1. Replace MyAdapter with an appropriate adapter name.
 */
export default class GetBibleNetAdapter extends Adapter
{
   private myBooks: string[];

   constructor(logger: ILogger, webGetter: IWebGetter)
   {
      super(logger, webGetter,
           /**
            * 2. Update Adapter settings appropriate to the adpater.
            */
           {
               adapterName: "GetBibleNet",
               termsUrl: "https://getbible.net/api"
           });

      // Recommended: Set array of book names that the adapter uses. This
      // should correspond to "Book" in CommonEnums.ts.
      this.myBooks = [
         "Gen",
         "Exo",
         "Lev",
         "Num",
         "Deu",
         "Jos",
         "Ju",
         "Ruth",
         "1Sam",
         "2Sam",
         "1Kings",
         "2Kings",
         "1Chr",
         "2Chr",
         "Ezra",
         "Neh",
         "Est",
         "Job",
         "Ps",
         "Pro",
         "Ecc",
         "Song",
         "Isa",
         "Jer",
         "Lam",
         "Eze",
         "Dan",
         "Hos",
         "Joel",
         "Amos",
         "Obad",
         "Jonah",
         "Mic",
         "Nah",
         "Hab",
         "Zeph",
         "Hag",
         "Zech",
         "Mal",
         "Mat",
         "Mark",
         "Luke",
         "John",
         "Acts",
         "Rom",
         "1Cor",
         "2Cor",
         "Gal",
         "Eph",
         "Philippians",
         "Col",
         "1Thes",
         "2Thes",
         "1Tim",
         "2Tim",
         "Titus",
         "Philemon",
         "Heb",
         "James",
         "1Pet",
         "2Pet",
         "1John",
         "2John",
         "3John",
         "Jude",
         "Rev"
      ];
   }

   public getVerse(options: IVerseParams): Promise<any>
   {
      return this.request({
            method: "GET",
            url: "http://getbible.net/json?passage=John3:16"},
            (data) => {
               const obj = JSON.parse(data.slice(1, -2));
               let verse = obj.book[0].chapter["16"].verse;
               verse = verse.replace("\n", "");
               verse = verse.replace("\r", "");
               return verse;
            });
   }
}

/**
 * When done with creating the adapter, add it to the AdapterList.ts.
 */
