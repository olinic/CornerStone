export interface ICache
{
   /**
    * Check if key exists and return the boolean.
    */
   checkFor(key: any): boolean;
   /**
    * Store an item in cache through a "key" reference. A cache
    * value can be provided to give an internal value. This is
    * useful for imposing a threshold.
    */
   store(key: any, item: any, cacheValue?: number): void;
   /**
    * Retrieve the item that is referenced by the provided key.
    */
   retrieve(key: any): Promise<any>;
}
