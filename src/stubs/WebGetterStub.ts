/**
 * WebGetterStub
 * Stub to simulate getting online resources.
 */

// Interfaces
import ILogger from "../interfaces/ILogger";
import IUrlOptions from "../interfaces/IUrlOptions";
import IWebGetter from "../interfaces/IWebGetter";

// External
import { Promise } from "es6-promise";
import { request as httpRequest} from "http";
import { request as httpsRequest } from "https";
import { parse } from "url";

export default class WebGetterStub implements IWebGetter
{
   public constructor(
         private logger: ILogger,
         private readonly PROMISE_TIMEOUT_PERIOD: number = 3000, // milliseconds
         /**
          * Library name. Allows the callback to call the appropriate object.
          */
         private libraryName: string = "CornerStone",
         private timeout: number = 200)
   {

   }

   /**
    * Retrieves URL using defined options.
    * Returns a Promise.
    * Usage:
    * <pre><code>
    * request({
    *   method: "GET",
    *   url: "https://bible-api.com/john%203:16"
    * })
    *   .then(function(response)
    *   {
    *      // do something with response
    *   })
    *   .catch(function(err)
    *   {
    *      // do something with err
    *   })
    * </code></pre>
    */
   public request(options: IUrlOptions): Promise<any>
   {
      return new Promise((
         resolve: (response: string) => void,
         reject: (err: Error) => void) => {

         // Send a response based on the source.
         let data;
         if (options.url.indexOf("getbible.net") !== -1) {
            data = '({"book":[{"book_ref":"Jn","book_name":"John","book_nr":"43",' +
            '"chapter_nr":"3","chapter":{"16":{"verse_nr":"16","verse":"' + options.url +
            '"}}}],"direction":"LTR","type":"verse","version":"kjv"});';
         } else {
            data = options.url;
         }
         setTimeout(resolve(data), this.timeout);
      });
   }
}
