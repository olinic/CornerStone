
import * as es6Promise from "es6-promise";
import * as http from "http";
import { parse } from "url";

declare var Qt: any;
declare var CornerStone: any;

const Promise = es6Promise.Promise;

console.log("test");

let getVerse;
/**
 * Access point for jsonp callback functions. Allows unique function names to be utilized.
 */
let jsonpCaller;

/**
 * Counter that creates unique jsonp callback names.
 */
let jsonpCounter = 0;

/**
 * Library name. Allows the callback to call the appropriate object.
 */
const libraryName = "CornerStone";

export interface IWebAccessor
{
   request(options: IUrlOptions): any;
}

export interface IUrlOptions
{
   /**
    * Method: JSONP, GET, POST, PUT, DELETE, etc.
    */
   method?: string;
   /**
    * URL to access
    */
   url: string;
}

/*let http;
// Attempt to load Node http
try
{
   http = require("http");
}
catch (err)
{
   http = undefined;
}*/

function isBrowser()
{
   return (typeof document !== "undefined" && typeof window !== "undefined");
}

function isNode()
{
   return (typeof http !== "undefined");
}

function isQt()
{
   return (typeof Qt !== "undefined");
}



/**
 * Request that is tied to the current platform. After the first
 * execution, it will no longer perform the platform check.
 *
 * The variable will be assigned to the appropriate function.
 */
let platformRequest = (options: IUrlOptions) =>
{
   if (isNode())
   {
      platformRequest = nodeRequest;
      return nodeRequest(options);
   }
   else if (isBrowser())
   {
      platformRequest = browserRequest;
      return browserRequest(options);
   }
   else if (isQt())
   {
      platformRequest = qtRequest;
      return qtRequest(options);
   }
   else
   {
      throw new Error("Platform not recognized or supported.");
   }
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
 *      // do something with err.statusText
 *   })
 * </code></pre>
 */
export function request(options: IUrlOptions)
{
   return platformRequest(options);
}

function cleanUrlOptions(options)
{

}

function cleanUrl(options)
{
   if (options.method === "JSONP")
   {

   }
}

function getCallback(url)
{
   // get search
   // http://localhost/path?search=value => ?search=value
   let searchParams = parse(url).search || "";

   // get callback parameter
   // callback=value
   let callbackReg = /callback=\w+/.exec(searchParams);
   let callbackParam = (callbackReg === null) ? "" : callbackReg[0];

   // pull value out of callback parameter, don't include the "="
   let start = callbackParam.indexOf("=");
   return callbackParam.substring(start + 1);
}

function nodeRequest({method = "GET", url}: IUrlOptions = {url: ""})
{
   // Default is to do nothing
   let preResolve = (response) => { return response; };

   if (method === "JSONP")
   {
      method = "GET";
      preResolve = (response) =>
      {
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
      resolve: (response: any) => any,
      reject: (err: object) => any) =>
   {

      let options = {
         method: method,
         protocol: parse(url).protocol || "http:",
         hostname: parse(url).hostname,
         port: Number(parse(url).port) || 80,
         path: (parse(url).pathname || "") + (parse(url).search || "")
      };

      const req = http.request(options, (res) =>
      {
         const { statusCode } = res;

         // reject on error
         if (statusCode < 200 || statusCode >= 300)
         {
            reject({
               status: statusCode,
            });
         }

         let data = "";
         res.on("data", (chunk) =>
         {
            data += chunk;
         });
         res.on("end", () =>
         {
            // handle JSONP if necessary
            data = preResolve(data);
            resolve(data);
         });

      });

      req.on('error', (e) => {
         console.error(e.message);
      });
      req.end();
   });
}

function browserRequest(options: IUrlOptions)
{
   console.log("browserRequest: Method is " + options.method);
   if (options.method === "JSONP")
   {
      console.log("Starting JSONP");
      return jsonpPromise(options);
   }
   else
   {
      return xmlHttpPromise(options);
   }

}

function qtRequest({method = "GET", url}: IUrlOptions = {url: ""})
{
   // more to come
}

function xmlHttpPromise({method = "GET", url}: IUrlOptions = {url: ""})
{
   return new Promise((
      resolve: (response: any) => any,
      reject: (err: object) => any) =>
   {
      // create our new http request
      const xhr = new XMLHttpRequest();

      // set it up
      xhr.open(method, url);
      xhr.onload = () =>
      {
         // on success, use resolve callback
         if (xhr.status >= 200 && xhr.status < 300)
         {
            resolve(xhr.response);
         }
         // on failure, use reject
         else
         {
            reject({
               status: xhr.status,
               statusText: xhr.statusText
            });
         }
      };
      // on failure, use reject
      xhr.onerror = () =>
      {
         reject({
            status: xhr.status,
            statusText: xhr.statusText,
         });
      };

      xhr.send();
   });
}

function jsonpPromise({method = "GET", url}: IUrlOptions = {url: ""})
{
   return new Promise((
      resolve: (response: any) => any,
      reject: (err: object) => any) =>
   {
      jsonpCounter++;
      // function name
      //const callFunctionName = "call" + jsonpCounter;
      const callFunctionName = "getVerse"

      // callback name
      //const myCallbackName: string = "jsonpCaller." + callFunctionName;
      const myCallbackName = callFunctionName;

      // create the callback
      //jsonpCaller[callFunctionName] = (data) =>

      // create "component" that retrieves the data and calls back
      if (isBrowser())
      {
         window[ myCallbackName ] = (data) =>
         {
            var json = JSON.stringify(data);
            console.log("Data: " + json);
            resolve(json);
            // clearTimeout

            // clean up
            // remove reference for Garbage Collector
            //jsonpCaller[callFunctionName] = null;
         }

         console.log("Creating new script!");
         const script = document.createElement("script");
         script.src = url;

         document.getElementsByTagName("head")[0].appendChild(script);
      }
      else if (isQt())
      {
         console.log("Qt.include exists!");
         Qt.include(url);
      }



      // send error if timeout is triggered
   });
}
