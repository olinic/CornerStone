import IAdapter, {
   IBibleContent,
   IChapterParams,
   ILanguages,
   IVerseParams
} from "../interfaces/IAdapter";
import IAdapterManager from "../interfaces/IAdapterManager";
import ILogger from "../interfaces/ILogger";

/**
 * Manages adapters by choosing which ones to use. Consolodates
 * results from all adapters for certain queries (languages, versions, etc.).
 */
export default class AdapterManager implements IAdapterManager
{
   public getVerse: any;
   public getChapter: any;

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

   public setVersion(): void
   {
   }

   public getLanguages(): Promise<ILanguages>
   {
      return new Promise((resolve, reject) => {
         resolve([]);
      });
   }

   private setAdapter()
   {
      this.currAdapter = this.adapters[0];
      this.getVerse = this.currAdapter.getVerse;
      this.getChapter = this.currAdapter.getChapter;
   }
}
