// Internal dependencies.
import Adapter from "../cornerstone/Adapter";
import ILogger from "../interfaces/ILogger";
import IWebGetter from "../interfaces/IWebGetter";

/**
 * 1. Replace MyAdapter with an appropriate adapter name.
 */
export default class GetBibleNetAdapter extends Adapter
{
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
   }

   public getVerse(verse: number, chapter: number, book: string): Promise<any>
   {
      return this.request({
            method: "GET",
            url: "http://getbible.net/json?passage=John3:16"});
   }
}

/**
 * When done with creating the adapter, add it to the AdapterList.ts.
 */
