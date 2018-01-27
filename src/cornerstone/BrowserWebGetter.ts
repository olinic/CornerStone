// Interfaces
import ILogger from "../interfaces/ILogger";
import IUrlOptions from "../interfaces/IUrlOptions";
import IWebGetter from "../interfaces/IWebGetter";

// External
import { Promise } from "es6-promise";

export default class BrowserWebGetter implements IWebGetter
{
   /**
    * Counter that creates unique jsonp callback names.
    */
   private jsonpCounter: number;

   public constructor(
         private logger: ILogger,
         private readonly PROMISE_TIMEOUT_PERIOD: number = 3000 /* milliseconds */)
   {
      this.jsonpCounter = 0;
   }

   public request(options: IUrlOptions): Promise<any>
   {
      if (options.method === "JSONP") {
         return this.jsonpPromise(options);
      }
      else {
         return this.xmlHttpPromise(options);
      }
   }

   private xmlHttpPromise({method = "GET", url}: IUrlOptions = {url: ""}): Promise<any>
   {
      return new Promise((
         resolve: (response: string) => void,
         reject: (err: Error) => void) => {
         // create our new http request
         const xhr = new XMLHttpRequest();

         // set it up
         xhr.open(method, url);
         xhr.onload = () => {
            // on success, use resolve callback
            if (xhr.status >= 200 && xhr.status < 300) {
               resolve(xhr.response);
            }
            // on failure, use reject
            else {
               reject(this.logger.logAndGiveError("Bad status", xhr.status, xhr.statusText,
                                                  "in URL", url));
            }
         };
         // on failure, use reject
         xhr.onerror = () => {
            reject(this.logger.logAndGiveError("Experienced error with request. Status",
                                               xhr.status, xhr.statusText, "in URL", url));
         };

         xhr.send();
      });
   }

   private jsonpPromise({method = "GET", url}: IUrlOptions = {url: ""}): Promise<any>
   {
      return new Promise((
         resolve: (response: string) => void,
         reject: (err: Error) => void) => {
         this.jsonpCounter++;

         // callback name
         const myCallbackName = "CornerStoneJsonp" + this.jsonpCounter;

         url = setupCallback(url, myCallbackName);

         // create "component" that retrieves the data and calls back
         const timeout = setTimeout(() => {
            reject(this.logger.logAndGiveError(url, "JSONP did not retrieve resource " +
                             "within the timeout period."));
         }, this.PROMISE_TIMEOUT_PERIOD);

         window[ myCallbackName ] = (data) => {
            clearTimeout(timeout);
            const json = JSON.stringify(data);

            // remove reference for Garbage Collector
            window[ myCallbackName ] = null;

            resolve(json);
         };

         const script = document.createElement("script");
         script.src = url;

         document.getElementsByTagName("head")[0].appendChild(script);
      });
   }

}

export function setupCallback(url: string, callback: string): string
{
   const callbackDefined = (url.indexOf("callback=") !== -1);
   if (callbackDefined) {
      //   Remove        callback=...&
      url = url.replace(/callback=\w+&?/, "");
   }

   // add the callback to the URL
   const prependCharacter = (url.indexOf("?") === -1) ? "?" : "&";
   url += prependCharacter + "callback=" + callback;

   return url;
}
