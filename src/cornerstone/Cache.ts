// Interfaces
import { ICache } from "../interfaces/ICache";
import { ILogger } from "../interfaces/ILogger";

// External
import { Promise } from "es6-promise";

/**
 * Provides caching for anything (including promises).
 */
export class Cache implements ICache
{
   /**
    * The Cache Object contains all of the values based on the key.
    */
   private cacheObject: object;

   /**
    * The keys array keeps up with all of the keys so that the keys can be managed.
    */
   private keys: any[];

   /**
    * Values associated to each key.
    */
   private keyValues: object;

   /**
    * Current cache value. Should always be the sum of all key values.
    */
   private cacheValue: number;

   public constructor(
      private logger: ILogger,
      private readonly MAX_CACHE_SIZE: number = 13,
      private maxCacheValue: number = -1)
   {
      this.cacheObject = {};
      this.keys = [];
      this.keyValues = {};
      this.cacheValue = 0;
   }

   public setMaxValue(max: number): void
   {
      this.logger.debug("Updating max value to " + max);
      this.maxCacheValue = max;
      // Clean up in the event that the max was reduced.
      this.cleanUpCache();
   }

   /**
    * Check for an existing item in the cache based on the provided key.
    */
   public checkFor(key: string | number): boolean
   {
      const exists = (this.keys.indexOf(key) !== -1);
      this.logger.debug("Key (" + key + ") does " + (exists ? "" : "not ") + "exist");
      return exists;
   }

   /**
    * Storage of key and value. A cacheValue can be provided.
    * The cacheValue is useful if the total cacheValue of the cache needs
    * to remain below a threshold (maxCacheValue).
    */
   public store(key: string | number, value: any, cacheValue: number = 0): void
   {
      if (!this.checkFor(key)) {
         // Add the new key to the list
         this.keys.push(key);
      }

      this.logger.info("Storing value for key (" + key + ")");
      // Store the item
      this.cacheObject[key] = value;
      // Increase the cache value
      this.cacheValue += cacheValue;
      this.keyValues[key] = cacheValue;
      // Clean up if necessary
      this.cleanUpCache();
   }

   /**
    * Retrieves the data from cache based on the key. If the data is a
    * promise, the promise itself is returned and not wrapped in a promise.
    * All other types are wrapped in a promise.
    */
   public retrieve(key: string | number): Promise<any>
   {
      const keyExists: boolean = this.checkFor(key);
      if (keyExists) {
         this.refreshKey(key);

         this.logger.debug("Retrieving value for key (" + key + ")");
         const item = this.cacheObject[key];
         // Don't wrap a promise in a promise
         if (item instanceof Promise) {
            return item;
         } else {
            // Wrap anything else in a promise
            return new Promise((
               resolve: (response: any) => void,
               reject: (err: Error) => void) => {
                  resolve(item);
               });
         }
      } else {
         throw this.logger.logAndGiveError("Key " + key + " does not exist in the cache.");
      }
   }

   /**
    * Clears the cache.
    */
   public clear(): void
   {
      this.logger.debug("Clearing the cache");
      this.cacheObject = {};
      this.keys = [];
   }

   /**
    * Shift a cache value out.
    */
   private shift(): void
   {
      // Remove the oldest key
      const oldKey: any = this.keys[0];
      this.remove(oldKey);
   }

   /**
    * Removes everything related to the key.
    */
   private remove(key): void
   {
      this.removeKey(key);
      // Reduce the cache value
      this.cacheValue -= this.keyValues[key];
      // Deallocate the properties
      this.cacheObject[key] = undefined;
      this.keyValues[key] = undefined;
   }

   /**
    * Removes the key (not the cached object).
    */
   private removeKey(key): void
   {
      const index: number = this.keys.indexOf(key);
      this.keys.splice(index, 1);
   }

   /**
    * Refresh the key that was recently used.
    * Move key to end of array (latest  position).
    * Allows most accessed items to stay in the cache.
    */
   private refreshKey(key): any
   {
      this.removeKey(key);
      this.keys.push(key);
   }

   /**
    * Checks and cleans up the cache. Specifically, checks for any exceeded thresholds.
    */
   private cleanUpCache(): void
   {
      while (this.maxCacheValue >= 0 && this.cacheValue > this.maxCacheValue) {
         // Remove items until cache value is below maxCacheValue
         this.shift();
      }
      while (this.keys.length > this.MAX_CACHE_SIZE) {
         this.shift();
      }
   }
}
