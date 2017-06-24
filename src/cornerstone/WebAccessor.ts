import * as es6Promise from "es6-promise";
import * as http from "http";

declare var Qt: any;
declare var CornerStone: any;

const Promise = es6Promise.Promise;

/**
 * Access point for jsonp callback functions. Allows unique function names to be utilized.
 */
export let jsonpCaller;

/**
 * Counter that creates unique jsonp callback names.
 */
let jsonpCounter = 0;

/**
 * Library name. Allows the callback to call the appropriate object.
 */
const libraryName = "CornerStone";

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
   /**
    * Parameters to send with the URL.
    * {
    *   param: value,
    *   param: value,
    *   ...
    * }
    * or
    * "param=value&param=value&..."
    */
   params?: string | object;
   /**
    * Header values for URL request.
    * {
    *   header: value,
    *   header: value,
    *   ...
    * }
    */
   headers?: object;
   /**
    * Name for callback function. Used internally.
    * Prevents conflicts between different jsonp calls.
    */
}

/**
 * Request that is tied to the current platform. After the first
 * execution, it will no longer perform the platform check.
 *
 * The variable will be assigned to the appropriate function.
 */
function platformRequest(options: IUrlOptions)
{
   if (isNode())
   {
      // platformRequest = nodeRequest;
      return nodeRequest(options);
   }
   else if (isBrowser())
   {
      // platformRequest = browserRequest;
      return browserRequest(options);
   }
   else if (isQt())
   {
      // platformRequest = qtRequest;
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
 * get({
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

function nodeRequest({method = "GET", url, params, headers}: IUrlOptions = {url: ""})
{
   // return a promise
   return new Promise((
      resolve: (response: any) => any,
      reject: (err: object) => any) =>
   {

      http.get(url, (res) =>
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
            resolve(data);
         });

      });
   });
}

function browserRequest(options: IUrlOptions)
{
   console.log("browserRequest: Method is " + options.method);
   return xmlHttpPromise(options);
}

function qtRequest({method = "GET", url, params, headers}: IUrlOptions = {url: ""})
{
   // more to come
}

function xmlHttpPromise({method = "GET", url, params, headers}: IUrlOptions = {url: ""})
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

      // setup headers
      if (headers)
      {
         Object.keys(headers).forEach((key) =>
         {
            // call for each key
            xhr.setRequestHeader(key, headers[key]);
         });
      }

      params = stringifyParams(params);

      xhr.send(params);
   });
}

/**
 * Convert provided parameters into a string of parameters, ready for a URL.
 */
function stringifyParams(params): string
{
   // string up the params if an object
   if (params && typeof params === "object")
   {
      params = Object.keys(params).map((key) =>
      {
         return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      }).join("&");
   }
   return params;
}

/**
 * Returns whether the provided haystack contains a needle.
 */
function strIncludes(haystack: string, needle: string): boolean
{
   return (haystack.indexOf(needle) !== -1);
}

function jsonpCallback(data)
{
   console.log(data);
}

/**
 * Sets up JSONP by including the remote script into our application.
 */
function setupJsonp(url: string, params: string, callbackName: string)
{
   // Are we currently in Qt or a browser? Let's check ...
   if (isBrowser())
   {

      const script = document.createElement("script");
      script.src = url + params + "";

      document.getElementsByTagName("head")[0].appendChild(script);
   }
   // check if Qt is defined
   else if (isQt())
   {
      console.log("Qt.include exists!");
      Qt.include(url + params);
   }
   else
   {
      throw new Error("I do not have a way to grab jsonp.");
   }
}

/**
 * Cleans up JSONP mess.
 */
function cleanUpJsonp(callbackName: string)
{
   // remove reference for Garbage Collector
   jsonpCaller[callbackName] = null;
}

function jsonp({url, params}: IUrlOptions = {url: ""})
{
   const paramStr: string = stringifyParams(params);
   const myCallbackName: string = "jsonpCallback" + jsonpCounter;
   jsonpCounter++;

   // Setup URL
   // check if callback is already defined
   if (!strIncludes(paramStr, "callback"))
   {
      // add our own callback function
   }

   // setupJsonp(myCallbackName);

   // Create callback function
   jsonpCaller[myCallbackName] = (data) =>
   {
      // clearTimeout
      // resolve
      // callback
      console.log(data);
      cleanUpJsonp(myCallbackName);
   };

   // send error if timeout is triggered
}
