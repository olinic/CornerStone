import IAdapter from "../interfaces/IAdapter";
import ILogger from "../interfaces/ILogger";
import IWebGetter from "../interfaces/IWebGetter";
import Adapter from "./Adapter";

/**
 * Manages adapters by choosing which ones to use. Consolodates
 * results from all adapters for certain queries (languages, versions, etc.).
 */
export default class AdapterManager
{
   private adapterConstructors: any[];
   private logger: ILogger;
   private currAdapter: Adapter;
   private webGetter: IWebGetter;

   constructor(logger: ILogger, adapters: any[], webGetter: IWebGetter)
   {
      this.logger = logger;
      this.adapterConstructors = adapters;
      this.webGetter = webGetter;
      // Set the current adapter.

   }

   public getVerse(
         verse: number,
         chapter: number,
         book: string,
         version?: string): Promise<any>
   {
      return this.currAdapter.getVerse(verse, chapter, book);
   }

   private setAdapter()
   {
      this.currAdapter = new this.adapterConstructors[0](this.logger, this.webGetter);
   }
}
