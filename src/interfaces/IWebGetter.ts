import IUrlOptions from "./IUrlOptions";

/**
 * Retrieve the online resource according to the provided
 * options.
 */
export default interface IWebGetter
{
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
   request(options: IUrlOptions): Promise<any>;
}
