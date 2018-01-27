import ILogger from "../interfaces/ILogger";
import {
   ETextFormat,
   IAdapterOptions
} from "../interfaces/IAdapter";
import { getOptionalValue } from "./AdapterUtils";


export default abstract class Adapter
{
   /**
    * Adapter name.
    */
   private readonly ADAPTER_NAME: string;

   /**
    * Maximum number of queries to be made.
    */
   private readonly MAX_QUERIES: number;

   /**
    * Time period for maximum number of queries.
    */
   private readonly QUERY_PERIOD: Date;

   /**
    * Maximum number of consecutive verses to be stored in cache.
    */
   private readonly MAX_CACHE_CONSECUTIVE_VERSES: number;

   /**
    * URL that contains the terms of usage for the developer
    * (for documentation).
    */
   private readonly API_TERMS_URL: string;

   /**
    * Verse format of adapter.
    */
   private readonly textFormat: ETextFormat;

   public constructor(
         logger: ILogger,
         options: IAdapterOptions
      )
   {
      this.ADAPTER_NAME = options.adapterName;
      this.MAX_QUERIES = (options.maxNumberOfQueries);
      this.QUERY_PERIOD = getOptionalValue(options.queryPeriod);
      this.MAX_CACHE_CONSECUTIVE_VERSES = getOptionalValue(options.maxVersesInCache);
      this.API_TERMS_URL = options.termsUrl;
      switch (options.textFormat) {
         case "plain": {
            this.textFormat = ETextFormat.PLAIN;
            break;
         }
         case "para": {
            this.textFormat = ETextFormat.PARA;
            break;
         }
         case "html": {
            this.textFormat = ETextFormat.HTML;
            break;
         }
      }
   }

   public getName(): string
   {
      return this.ADAPTER_NAME;
   }

   public getTermsUrl(): string
   {
      return this.API_TERMS_URL;
   }
}
