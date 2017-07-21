import { Promise } from "es6-promise";

/**
 * Provides caching for anything (including promises).
 */
class LocalCache
{
   /**
    * The Cache Object contains all of the values based on the key.
    */
   private cacheObject: object;

   /**
    * The keys array keeps up with all of the keys so that the keys can be managed.
    */
   private keys: any[];

   public constructor(private readonly MAX_CACHE_SIZE: number = 13)
   {
      this.cacheObject = {};
      this.keys = [];
   }

   /**
    * Removes the key from the array and returns the item.
    */
   private removeKey(array: any[], key): any
   {
      const index: number = array.indexOf(key);
      const item = array.splice(index, 1)[0];
      return item;
   }

   /**
    * Check for an existing item in the cache based on the provided key.
    */
   public checkFor(key: string | number): boolean
   {
      return (this.keys.indexOf(key) !== -1);
   }

   /**
    * Synchronous storage of key and value.
    */
   public store(key: string | number, value: any): void
   {
      if (!this.checkFor(key)) {
         // add the new key to the list
         this.keys.push(key);
      }

      // store the item
      this.cacheObject[key] = value;
      // clean up if necessary
      if (this.keys.length > this.MAX_CACHE_SIZE) {
         // shift the old key off of the array
         const oldKey: any = this.keys.shift();
         // deallocate the property
         this.cacheObject[oldKey] = undefined;
      }
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
         // Move key to end of array (latest position). Allows most
         // accessed items to stay in the cache.
         this.removeKey(this.keys, key);
         this.keys.push(key);

         const item = this.cacheObject[key]
         // don't wrap a promise in a promise
         if (item instanceof Promise) {
            return item;
         } else {
            // wrap anything else in a promise
            return new Promise((
               resolve: (response: any) => Promise<any>,
               reject: (err: Error) => Promise<Error>) => {
                  resolve(item);
               });
         }
      } else {
         throw new Error("Key " + key + " does not exist in the cache.");
      }
   }

   /**
    * Clears the cache.
    */
   public clear(): void
   {
      this.cacheObject = {};
      this.keys = [];
   }
}

let cache;

/**
 * Returns the instance of the cache. Follows the singleton design pattern.
 */
export function getInstance(): LocalCache
{
   if (typeof cache === "undefined") {
      cache = new LocalCache();
   }

   return cache;
}
