// internal
import IUrlOptions from "../interfaces/IUrlOptions";
import IWebGetter from "../interfaces/IWebGetter";

// external
import { Promise } from "es6-promise";

/**
 * Convenience function for request.
 */
export function request(
      options: IUrlOptions,
      webGetter: IWebGetter,
      postProcessing:
         ( data: any ) => any
         =
         ( data ) => data, // default to return the same data.
      onSuccess: ( data: string ) => void
                 =
                 ( data ) => {}, // do nothing by default
      onError:   ( err: Error ) => void
                 =
                 ( err ) => {}, // do nothing by default
      ): Promise<any>
{
   return new Promise((
         resolve: (response: string) => void,
         reject: (err: Error) => void) => {
      if (typeof options === "undefined" || options === null) {
         // If options are not defined, postProcessing provides data.
         const data = postProcessing(null);
         onSuccess(data);
         resolve(data);
      } else {
         webGetter
            .request(options)
            .then((response) => {
               const processedData = postProcessing(response);
               onSuccess(processedData);
               resolve(processedData);
            }).catch((err) => {
               onError(err);
               reject(err);
            });
      }
   });
}

/**
 * If defined, return item.
 * If undefined, return null.
 */
export function getOptionalValue(item: any): any
{
   return (typeof item === "undefined") ? null : item;
}
