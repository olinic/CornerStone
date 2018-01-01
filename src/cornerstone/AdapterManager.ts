import IAdapter, { IVerseParams } from "../interfaces/IAdapter";
import IAdapterManager from "../interfaces/IAdapterManager";
import ILogger from "../interfaces/ILogger";
import IWebGetter from "../interfaces/IWebGetter";
import Adapter from "./Adapter";
import { Book } from "./CommonEnums";

/**
 * Manages adapters by choosing which ones to use. Consolodates
 * results from all adapters for certain queries (languages, versions, etc.).
 */
export default class AdapterManager implements IAdapterManager
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
      this.setAdapter();
   }

   public getVerse(options: IVerseParams): Promise<any>
   {
      return this.currAdapter.getVerse(options);
   }

   public setVersion(): void
   {

   }

   private setAdapter()
   {
      this.currAdapter = new this.adapterConstructors[0](this.logger, this.webGetter);
   }
}
