import { IAdapter } from "../interfaces/IAdapter";
import { IAdapterManager } from "../interfaces/IAdapterManager";
import { ILogger } from "../interfaces/ILogger";

/**
 * Manages adapters by choosing which ones to use. Consolodates
 * results from all adapters for certain queries (languages, versions, etc.).
 */
export class AdapterManager implements IAdapterManager
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

   public getAdapter(): IAdapter
   {
      return this.currAdapter;
   }

   private setAdapter()
   {
      this.currAdapter = this.adapters[0];
   }
}
