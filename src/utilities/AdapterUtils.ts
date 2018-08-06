import { IUrlOptions } from "../interfaces/IUrlOptions";
import { IWebGetter } from "../interfaces/IWebGetter";

/**
 * Convenience function for request.
 */
export function request(
      options: IUrlOptions,
      webGetter: IWebGetter,
      postProcessing:
         ( data: any ) => any
         =
         ( data ) => data, // Default to return the same data.
      onSuccess: ( data: string ) => void
                 =
                 ( data ) => null, // Do nothing by default
      onError:   ( err: Error ) => void
                 =
                 ( err ) => null, // Do nothing by default
      ): Promise<any>
{
   return new Promise((
         resolve: (response: string) => void,
         reject: (err: Error) => void) => {

      const successCase = (data) => {
         onSuccess(data);
         resolve(data);
      };
      const failureCase = (err) => {
         onError(err);
         reject(err);
      };
      const processData = (data) => {
         try {
            const processedData = postProcessing(data);
            successCase(processedData);
         } catch (err) {
            failureCase(err);
         }
      };

      if (typeof options === "undefined" || options === null) {
         // If options are not defined, postProcessing provides data.
         processData(null);
      } else {
         webGetter
            .request(options)
            .then((response) => {
               processData(response);
            }).catch((err) => {
               failureCase(err);
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
