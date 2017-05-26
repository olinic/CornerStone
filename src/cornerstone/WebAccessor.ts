var Promise = require('es6-promise').Promise;

declare var Qt: any;
declare var CornerStone: any;


export interface UrlOptions
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
   *  param: value,
   *  param: value,
   *  ...
   * }
   * or
   * "param=value&param=value&..."
   */
  params?: string | Object;
  /**
   * Header values for URL request.
   * {
   *  header: value,
   *  header: value,
   *  ...
   * }
   */
  headers?: Object;
  /**
   * Name for callback function. Used internally.
   * Prevents conflicts between different jsonp calls.
   */
}

/**
 * Retrieves URL using defined options.
 * Returns a Promise.
 * Usage:
 * <pre><code>
 * get({
 *  method: 'GET',
 *  url: 'https://bible-api.com/john%203:16'
 * })
 *  .then(function(response)
 *  {
 *    // do something with response
 *  })
 *  .catch(function(err)
 *  {
 *    // do something with err.statusText
 *  })
 * </code></pre>
 */
export function get({method = 'GET', url, params, headers}: UrlOptions = {url: ''})
{
  if (method == "JSONP")
  {

    // check if document is defined locally
    if (typeof document !== "undefined")
    {
      console.log("document exists.");
      var script = document.createElement('script');
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);

    }
    // check if Qt is defined
    else if (typeof Qt !== "undefined")
    {
      console.log("Qt.include exists!");

    }
    else
    {
      console.log("I do not have a way to grab jsonp.");
    }

    // send error if timeout is triggered


  }
  // use HTTP Request
  else
  {
    // return a promise
    return new Promise(function(
      resolve: (response: any) => any,
      reject: (err: Object) => any)
    {
      // create our new http request
      let xhr = new XMLHttpRequest();
      // set it up
      xhr.open(method, url);
      xhr.onload = function()
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
      }
      // on failure, use reject
      xhr.onerror = function()
      {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }

      // setup headers
      if (headers)
      {
        Object.keys(headers).forEach(function(key)
        {
          // call for each key
          xhr.setRequestHeader(key, headers[key]);
        })
      }

      params = stringifyParams(params);

      xhr.send(params);
    });
  }
}

/**
 * Convert provided parameters into a string of parameters, ready for a URL.
 */
function stringifyParams(params) : string
{
  // string up the params if an object
  if (params && typeof params === 'object')
  {
    params = Object.keys(params).map(function (key)
    {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
  return params;
}

/**
 * Returns whether the provided haystack contains a needle.
 */
function strIncludes(haystack : string, needle: string) : boolean
{
  return (haystack.indexOf(needle) !== -1);
}

function jsonpCallback(data)
{
  console.log(data);
}

/**
 * Access point for jsonp callback functions. Allows unique function names to be utilized.
 */
export var jsonpCaller;

/**
 * Counter that creates unique jsonp callback names.
 */
var jsonpCounter = 0;

/**
 * Library name. Allows the callback to call the appropriate object.
 */
var libraryName = "CornerStone";

/**
 * Sets up JSONP by including the remote script into our application.
 */
/*function setupJsonp(callbackName : string)
{
  // Are we currently in Qt or a browser? Let's check ...
  // check if document is defined locally
  if (typeof document !== "undefined")
  {

    let script = document.createElement('script');
    script.src = url + params + "";

    document.getElementsByTagName('head')[0].appendChild(script);

  }
  // check if Qt is defined
  else if (typeof Qt !== "undefined")
  {
    console.log("Qt.include exists!");
    Qt.include(url + paramStr);
  }
  else
  {
    console.log("I do not have a way to grab jsonp.");
    // maybe throw an error
  }
}*/

function prepareJsonpUrl()
{

}

/**
 * Cleans up JSONP mess.
 */
function cleanUpJsonp(callbackName : string)
{
  // remove reference for Garbage Collector
  jsonpCaller[callbackName] = null;
}

function jsonp({url, params}: UrlOptions = {url: ''})
{
  let paramStr : string = stringifyParams(params);
  let myCallbackName : string = "jsonpCallback" + jsonpCounter;

  // Setup URL
  // check if callback is already defined
  if (strIncludes(paramStr, "callback"))
  {

  }
  else
  {
    // add our own callback function
  }

  //setupJsonp(myCallbackName);

  // Create callback function
  jsonpCaller[myCallbackName] = function(data)
  {
    // clearTimeout
    // resolve
    // callback
    console.log(data);
    cleanUpJsonp(myCallbackName);
  }






  // send error if timeout is triggered



}
