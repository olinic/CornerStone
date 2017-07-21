import { getInstance as getCacheInstance } from "./Cache";
import webRequest, { IUrlOptions } from "./WebAccessor";

let cache = getCacheInstance();

/**
 * Requests a resource based on the provided options. Queries the cache.
 * If item does not exist in the cache, a web request will be issued.
 */
export default function request(options: IUrlOptions): Promise<any>
{
   const url = options.url;
   if (cache.checkFor(url)) {
      // retrieve from cache
      return cache.retrieve(url);
      
   } else {
      let promise = webRequest(options);
      // store response into cache
      cache.store(url, promise);
      return promise;
   }
}
