import { ICache } from "../interfaces/ICache";
import { ILogger } from "../interfaces/ILogger";
import { IUrlOptions } from "../interfaces/IUrlOptions";
import { IWebGetter } from "../interfaces/IWebGetter";

export default class SmartGetter implements IWebGetter
{
   public constructor(
         private logger: ILogger,
         private cache: ICache,
         private webGetter: IWebGetter) {

   }

   /**
    * Requests a resource based on the provided options. Queries the cache.
    * If item does not exist in the cache, a web request will be issued.
    */
   public request(options: IUrlOptions): Promise<any>
   {
      const url = options.url;
      if (this.cache.checkFor(url)) {
         // retrieve from cache
         return this.cache.retrieve(url);

      } else {
         const promise = this.webGetter.request(options);
         // store response into cache
         this.cache.store(url, promise);
         return promise;
      }
   }
}
