/**
 * WebAccessor
 * Accessor for any online resource.
 */

// Interfaces
import { ILogger } from "../interfaces/ILogger";
import { IUrlOptions } from "../interfaces/IUrlOptions";
import { IWebGetter } from "../interfaces/IWebGetter";

// Internal
import {
   isBrowser,
   isNode
} from "./Platform";

// External
import { Promise } from "es6-promise";
import { request as httpRequest} from "http";
import { request as httpsRequest } from "https";
import { parse } from "url";

export default class WebAccessor implements IWebGetter
{
   /**
    * Counter that creates unique jsonp callback names.
    */
   private jsonpCounter: number;

   private platformRequest;

   public constructor(
         private logger: ILogger,
         private readonly PROMISE_TIMEOUT_PERIOD: number = 3000, // milliseconds
         /**
          * Library name. Allows the callback to call the appropriate object.
          */
         private libraryName: string = "CornerStone") {

      this.jsonpCounter = 0;

      /**
       * Request that is tied to the current platform. After the first
       * execution, it will no longer perform the platform check.
       *
       * The variable will be assigned to the appropriate platform-specific function.
       */
      this.platformRequest = (options: IUrlOptions) => {
         if (isBrowser()) {
            this.platformRequest = this.browserRequest;
            return this.browserRequest(options);
         } else if (isNode()) {
            this.platformRequest = this.nodeRequest;
            return this.nodeRequest(options);
         } else {
            throw logger.logAndGiveError("Platform not recognized or supported.");
         }
      };
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
   public request(options: IUrlOptions): Promise<any> {
      return this.platformRequest(options);
   }

   private requestErrorMessage(url: string, statusMessage: string, statusCode?: number): string {
      statusMessage = "(" + statusMessage + ")";

      let statusCodeMessage = "";
      if (statusCode !== undefined) {
         statusCodeMessage = "Status Code: " + statusCode;
      }

      return ("Failed to get resource from " + url + " " +
               statusCodeMessage + " " + statusMessage);
   }

   private setupCallback(url: string, callback: string): string {
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

   private nodeRequest({method, url}: IUrlOptions = {url: ""}): Promise<any> {
      // Default is to do nothing
      let preResolve = (response) => response;

      if (method === "JSONP") {
         method = "GET";
         // callback name in Node does not matter,
         // the name is stripped from the returned output.
         url = this.setupCallback(url, "nodeCallback");
         preResolve = (response) => {
            let start = response.indexOf("({");
            start = (start !== -1) ? start : 0;

            let end = response.lastIndexOf("})");
            end = (end !== -1) ? end : response.length;

            // Return the JSON without the parentheses.
            const json = response.substring(start + 1, end + 1);
            return json;
         };
      }

      // return a promise
      return new Promise((
         resolve: (response: string) => Promise<string>,
         reject: (err: Error) => Promise<Error>) => {

         const options = {
            hostname: parse(url).hostname,
            method,
            path: (parse(url).pathname || "") + (parse(url).search || ""),
            port: Number(parse(url).port) || 80,
            protocol: parse(url).protocol || "http:"
         };

         const webRequest: any = (options.protocol.toLowerCase().indexOf("https") === -1)
                                    ? httpRequest : httpsRequest;

         const req = webRequest(options, (res) => {
            const { statusCode, statusMessage } = res;

            // reject on error
            if (statusCode < 200 || statusCode >= 300) {
               reject(new Error(this.requestErrorMessage(url, statusMessage, statusCode)));
            }

            let data = "";

            res.on("data", (chunk) => {
               data += chunk;
            });

            res.on("end", () => {
               // handle JSONP if necessary
               data = preResolve(data);
               resolve(data);
            });

         });

         req.on("error", (e) => {
            reject(new Error(this.requestErrorMessage(url, e.message)));
         });
         req.end();
      });
   }

   private browserRequest(options: IUrlOptions): Promise<any> {
      if (options.method === "JSONP") {
         return this.jsonpPromise(options);
      }
      else {
         return this.xmlHttpPromise(options);
      }
   }

   private xmlHttpPromise({method = "GET", url}: IUrlOptions = {url: ""}): Promise<any> {
      return new Promise((
         resolve: (response: string) => Promise<string>,
         reject: (err: Error) => Promise<Error>) => {
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
               reject(new Error(this.requestErrorMessage(url, xhr.statusText, xhr.status)));
            }
         };
         // on failure, use reject
         xhr.onerror = () => {
            reject(new Error(this.requestErrorMessage(url, xhr.statusText, xhr.status)));
         };

         xhr.send();
      });
   }

   private jsonpPromise({method = "GET", url}: IUrlOptions = {url: ""}): Promise<any> {
      return new Promise((
         resolve: (response: string) => Promise<string>,
         reject: (err: Error) => Promise<Error>) => {
         this.jsonpCounter++;
         // function name
         const callFunctionName = this.libraryName + "Jsonp" + this.jsonpCounter;

         // callback name
         const myCallbackName = callFunctionName;

         url = this.setupCallback(url, myCallbackName);

         // create "component" that retrieves the data and calls back
         const timeout = setTimeout(() => {
            reject(new Error(this.requestErrorMessage(url, "JSONP did not retrieve resource " +
                             "within the timeout period.")));
         }, this.PROMISE_TIMEOUT_PERIOD);

         window[ myCallbackName ] = (data) => {
            clearTimeout(timeout);
            const json = JSON.stringify(data);

            // remove reference for Garbage Collector
            window[ callFunctionName ] = null;

            resolve(json);
         };

         const script = document.createElement("script");
         script.src = url;

         document.getElementsByTagName("head")[0].appendChild(script);
      });
   }
}
