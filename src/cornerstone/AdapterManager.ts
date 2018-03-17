import IAdapter, { IVerseParams } from "../interfaces/IAdapter";
import IAdapterManager from "../interfaces/IAdapterManager";
import ILogger from "../interfaces/ILogger";

/**
 * Manages adapters by choosing which ones to use. Consolodates
 * results from all adapters for certain queries (languages, versions, etc.).
 */
export default class AdapterManager implements IAdapterManager
{
   private adapters: IAdapter[];
   private logger: ILogger;
   private currAdapter: IAdapter;

   constructor(logger: ILogger, adapters: IAdapter[])
   {
      this.logger = logger;
      this.adapters = adapters;
      // Set the current adapter.
      this.setAdapter();
   }

   public getVerse(options: IVerseParams): Promise<any>
   {
      this.logger.debug("Verse options are Book Num:", options.book,
            "Chapter:", options.chapter,
            "Verse:", options.verse);
      return this.currAdapter.getVerse(options);
   }

   public setVersion(): void
   {

   }

   private setAdapter()
   {
      this.currAdapter = this.adapters[0];
   }
}
