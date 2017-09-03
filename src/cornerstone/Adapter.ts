
abstract class Adapter
{
   /**
    * Adapter name used to include or exclude the adapter.
    */
   protected readonly ADAPTER_NAME: string;

   /**
    * Maximum number of consecutive verses to be stored in cache.
    */
   protected readonly MAX_CACHE_CONSECUTIVE_VERSES: number;

   /**
    * Maximum number of queries to be made.
    */
   protected readonly MAX_QUERIES: number;

   /**
    * Time period for maximum number of queries.
    */
   protected readonly QUERY_PERIOD: Date;

   /**
    * URL that contains the terms of usage for the developer (mainly for documentation).
    */
   protected readonly API_TERMS_URL: string;

}
