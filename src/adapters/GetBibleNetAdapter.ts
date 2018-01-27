// Internal dependencies.
import { IVerseParams } from "../interfaces/IAdapter";
import IOnlineAdapterOptions from "../interfaces/IOnlineAdapterOptions";

/**
 * 1. Update Adapter settings appropriate to the adpater.
 */
export const GetBibleNetAdapter: IOnlineAdapterOptions = {
   adapterName: "GetBibleNet",
   termsUrl: "https://getbible.net/api",
   textFormat: "para",
   // 2. Set array of book names that the adapter uses. This
   // should correspond to "Book" in interfaces/ICornerStone.ts.
   books: [
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
   ],
   howToGetVerse: (options) => {
      return {
         method: "GET",
         url: "http://getbible.net/json?passage=John3:16"
      };
   },
   howToInterpretVerse: (data) => {
      const obj = JSON.parse(data.slice(1, -2));
      let output = {
         verses: [
            {
               verseNumber: 16,
               text: obj.book[0].chapter["16"].verse
               .replace("\n", "")
               .replace("\r", "")
            }
         ],
         bookName: obj.book[0].book_name,
         ltr: true
      }
      return output;
   }

};

/**
 * When done with creating the adapter, add it to the AdapterList.ts and
 * remove all instruction comments (like this one :)
 */
